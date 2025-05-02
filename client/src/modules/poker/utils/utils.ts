import { CardSuit, CardValue } from "../types";

export const sortedValues = [
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

export const sortedSuits = [
  CardSuit.HEARTS,
  CardSuit.SPADES,
  CardSuit.DIAMONDS,
  CardSuit.CLUBS,
];

export function valueToInt(value: CardValue) {
  switch (value) {
    case CardValue.ACE:
      return 14;
    case CardValue.KING:
      return 13;
    case CardValue.QUEEN:
      return 12;
    case CardValue.JACK:
      return 11;
    default:
      return parseInt(value);
  }
}
