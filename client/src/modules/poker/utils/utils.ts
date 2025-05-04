import {
  CardSuit,
  CardValue,
  CardValueCharacter,
  PokerCombination,
  PokerCombinationName,
} from "../types";

export const SORTED_VALUES = [
  CardValue.TWO,
  CardValue.THREE,
  CardValue.FOUR,
  CardValue.FIVE,
  CardValue.SIX,
  CardValue.SEVEN,
  CardValue.EIGHT,
  CardValue.NINE,
  CardValue.TEN,
  CardValue.JACK,
  CardValue.QUEEN,
  CardValue.KING,
  CardValue.ACE,
];

export const SORTED_SUITS = [
  CardSuit.HEARTS,
  CardSuit.SPADES,
  CardSuit.DIAMONDS,
  CardSuit.CLUBS,
];

export const SORTED_COMBINATIONS: PokerCombination[] = [
  PokerCombination.HIGH_CARD,
  PokerCombination.PAIR,
  PokerCombination.TWO_PAIRS,
  PokerCombination.THREE_OF_A_KIND,
  PokerCombination.STRAIGHT,
  PokerCombination.FLUSH,
  PokerCombination.FULL_HOUSE,
  PokerCombination.FOUR_OF_A_KIND,
  PokerCombination.STRAIGHT_FLUSH,
  PokerCombination.ROYAL_FLUSH,
];

export function combinationToHumanName(
  combination: PokerCombination,
): PokerCombinationName {
  switch (combination) {
    case PokerCombination.ROYAL_FLUSH:
      return "Royal Flush";
    case PokerCombination.STRAIGHT_FLUSH:
      return "Straight Flush";
    case PokerCombination.FOUR_OF_A_KIND:
      return "Four of a Kind";
    case PokerCombination.FULL_HOUSE:
      return "Full House";
    case PokerCombination.FLUSH:
      return "Flush";
    case PokerCombination.STRAIGHT:
      return "Straight";
    case PokerCombination.THREE_OF_A_KIND:
      return "Three of a Kind";
    case PokerCombination.TWO_PAIRS:
      return "Two Pairs";
    case PokerCombination.PAIR:
      return "Pair";
    case PokerCombination.HIGH_CARD:
      return "High Card";
  }
}

export function valueToCharacter(value: CardValue): CardValueCharacter {
  switch (value) {
    case CardValue.ACE:
      return "A";
    case CardValue.KING:
      return "K";
    case CardValue.QUEEN:
      return "Q";
    case CardValue.JACK:
      return "J";
    case CardValue.TEN:
      return "10";
    case CardValue.NINE:
      return "9";
    case CardValue.EIGHT:
      return "8";
    case CardValue.SEVEN:
      return "7";
    case CardValue.SIX:
      return "6";
    case CardValue.FIVE:
      return "5";
    case CardValue.FOUR:
      return "4";
    case CardValue.THREE:
      return "3";
    case CardValue.TWO:
      return "2";
  }
}
