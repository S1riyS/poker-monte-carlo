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
      return 10;
    case CardValue.NINE:
      return 9;
    case CardValue.EIGHT:
      return 8;
    case CardValue.SEVEN:
      return 7;
    case CardValue.SIX:
      return 6;
    case CardValue.FIVE:
      return 5;
    case CardValue.FOUR:
      return 4;
    case CardValue.THREE:
      return 3;
    case CardValue.TWO:
      return 2;
  }
}

export function cardToApiCard(card: CardType): ApiCard {
  console.log("converting to api card", card);
  console.log({
    suit: card.suit.toLowerCase() as ApiCard["suit"],
    rank: cardValueToInt(card.value),
  });
  return {
    suit: card.suit.toLowerCase() as ApiCard["suit"],
    rank: cardValueToInt(card.value),
  };
}
