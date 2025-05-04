export enum PokerCombination {
  HIGH_CARD = "HIGH_CARD",
  PAIR = "PAIR",
  TWO_PAIRS = "TWO_PAIRS",
  THREE_OF_A_KIND = "THREE_OF_A_KIND",
  STRAIGHT = "STRAIGHT",
  FLUSH = "FLUSH",
  FULL_HOUSE = "FULL_HOUSE",
  FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
  STRAIGHT_FLUSH = "STRAIGHT_FLUSH",
  ROYAL_FLUSH = "ROYAL_FLUSH",
}

export type PokerCombinationName =
  | "High Card"
  | "Pair"
  | "Two Pairs"
  | "Three of a Kind"
  | "Straight"
  | "Flush"
  | "Full House"
  | "Four of a Kind"
  | "Straight Flush"
  | "Royal Flush";

export type CardValueCharacter =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

export enum CardValue {
  ACE = "ACE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  EIGHT = "EIGHT",
  NINE = "NINE",
  TEN = "TEN",
  JACK = "JACK",
  QUEEN = "QUEEN",
  KING = "KING",
}

export enum CardSuit {
  CLUBS = "CLUBS",
  DIAMONDS = "DIAMONDS",
  HEARTS = "HEARTS",
  SPADES = "SPADES",
}

export type Card = {
  value: CardValue;
  suit: CardSuit;
};

export enum CardStyle {
  SIMPLE = "SIMPLE",
  MIRRORED = "MIRRORED",
}

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

export type GeneralPokerHand = {
  value0: CardValue;
  value1: CardValue;
  suited: boolean;
};

export type Stat = {
  win: number;
  lose: number;
  tie: number;
};
