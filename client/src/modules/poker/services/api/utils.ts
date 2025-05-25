import { Card as CardType } from "src/modules/poker/types";
import { cardValueToInt, intToCardValue } from "../../utils/utils";
import { ApiCard } from "./types";

export function cardToApiCard(card: CardType): ApiCard {
  return {
    suit: card.suit.toLowerCase() as ApiCard["suit"],
    rank: cardValueToInt(card.value),
  };
}

export function apiCardToCard(card: ApiCard): CardType {
  return {
    value: intToCardValue(card.rank),
    suit: card.suit.toUpperCase() as CardType["suit"],
  };
}
