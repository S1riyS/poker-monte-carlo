import { Card as CardType, CardValue } from "src/modules/poker/types";
import { ApiCard, CardValueInt } from "./types";

export function cardValueToInt(value: CardValue): CardValueInt {
  switch (value) {
    case CardValue.ACE:
      return 14;
    case CardValue.KING:
      return 13;
    case CardValue.QUEEN:
      return 12;
    case CardValue.JACK:
      return 11;
    case CardValue.TEN:
    case CardValue.NINE:
    case CardValue.EIGHT:
    case CardValue.SEVEN:
    case CardValue.SIX:
    case CardValue.FIVE:
    case CardValue.FOUR:
    case CardValue.THREE:
    case CardValue.TWO:
      return parseInt(value) as CardValueInt;
  }
}

export function cardToApiCard(card: CardType): ApiCard {
  return {
    suit: card.suit,
    rank: cardValueToInt(card.value),
  };
}
