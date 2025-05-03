import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  RawRunSimulationRequest,
  RawSimulationEntry,
  RunSimulationRequest,
  RunSimulationResponse,
} from "./types";
import { cardToApiCard } from "./utils";

export const pokerApi = createApi({
  reducerPath: "pokerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_API_BASE_URL ?? "") + "/api/v1",
  }),
  endpoints: (build) => ({
    runSimulation: build.mutation<RunSimulationResponse, RunSimulationRequest>({
      query: (data) => ({
        url: "/simulation",
        method: "POST",
        body: {
          hand: data.hand.map(cardToApiCard),
          table: data.table ? data.table.map(cardToApiCard) : [],
          iterations: data.iterations,
          players: data.players,
        } as RawRunSimulationRequest,
      }),
      transformResponse: (data) => {
        const raw = (data as { Data: RawSimulationEntry[] }).Data;

        const transformed: RunSimulationResponse = raw.map((entry) => ({
          name: entry.Name.toUpperCase() as RunSimulationResponse[number]["name"],
          win: entry.Win,
          lose: entry.Lose,
          tie: entry.Tie,
        }));

        return transformed;
      },
    }),
  }),
});

export const { useRunSimulationMutation } = pokerApi;
