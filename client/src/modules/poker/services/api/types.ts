import { CardSuit, PokerCombination } from "../../types";

export type CardValueInt =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

export type ApiCard = {
  rank: CardValueInt;
  suit: CardSuit;
};

export type RunSimulationRequest = {
  iterations: number;
  players: number;
  hand: ApiCard[];
  table?: ApiCard[];
};

export type RunSimulationResponse = {
  name: PokerCombination;
  win: number;
  lose: number;
  tie: number;
}[];

// compatibility util
export type RawSimulationEntry = {
  Name: string;
  Win: number;
  Lose: number;
  Tie: number;
};
