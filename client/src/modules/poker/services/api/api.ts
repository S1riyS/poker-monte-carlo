import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  RawSimulationEntry,
  RunSimulationRequest,
  RunSimulationResponse,
} from "./types";

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
        body: data,
      }),
      transformResponse: (data) => {
        const raw = (data as { Data: RawSimulationEntry[] }).Data;

        const transformed: RunSimulationResponse = raw.map((entry) => ({
          name: entry.Name.toUpperCase() as RunSimulationResponse[number]["name"],
          win: entry.Win,
          lose: entry.Lose,
          tie: entry.Tie,
        }));

        console.log("RESULT", transformed);
        return transformed;
      },
    }),
  }),
});

export const { useRunSimulationMutation } = pokerApi;
