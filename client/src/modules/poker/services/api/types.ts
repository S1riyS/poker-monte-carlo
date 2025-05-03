import { Card as CardType, PokerCombination } from "../../types";

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
  suit: "hearts" | "diamonds" | "clubs" | "spades";
};

export type RunSimulationRequest = {
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
  Name: string;
  Win: number;
  Lose: number;
  Tie: number;
};
