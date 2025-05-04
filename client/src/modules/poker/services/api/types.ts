import { Card as CardType, CardValueInt, PokerCombination } from "../../types";

export type ApiCard = {
  rank: CardValueInt;
  suit: "hearts" | "diamonds" | "clubs" | "spades";
};

export type RunSimulationRequest = {
  signal?: AbortSignal;
  iterations: number;
  players: number;
  hand: CardType[];
  table?: CardType[];
};

export type RawRunSimulationRequest = {
  hand: ApiCard[];
  table?: ApiCard[];
  iterations: number;
  players: number;
};

export type RunSimulationResponse = {
  name: PokerCombination;
  win: number;
  lose: number;
  tie: number;
}[];

// compatibility util
export type RawSimulationEntry = {
  name: string;
  win: number;
  lose: number;
  tie: number;
};
