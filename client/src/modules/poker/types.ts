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
}

export enum CardValue {
  ACE = "A",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
}

export enum CardSuit {
  CLUBS = "Clubs",
  DIAMONDS = "Diamonds",
  HEARTS = "Hearts",
  SPADES = "Spades",
}

export type Card = {
  value: CardValue;
  suit: CardSuit;
};

export enum CardStyle {
  SIMPLE = "Simple",
  MIRRORED = "Mirrored",
}
