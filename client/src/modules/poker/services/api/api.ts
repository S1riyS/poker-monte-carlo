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
        signal: data.signal,
      }),
      transformResponse: (data) => {
        const raw = (data as { data: RawSimulationEntry[] }).data;
        const transformed: RunSimulationResponse = raw.map((entry) => ({
          name: entry.name.toUpperCase() as RunSimulationResponse[number]["name"],
          win: entry.win,
          lose: entry.lose,
          tie: entry.tie,
        }));
        return transformed;
      },
    }),
  }),
});

export const { useRunSimulationMutation } = pokerApi;
