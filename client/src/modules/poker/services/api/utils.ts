import { Card as CardType } from "src/modules/poker/types";
import { cardValueToInt } from "../../utils/utils";
import { ApiCard } from "./types";

export function cardToApiCard(card: CardType): ApiCard {
  return {
    suit: card.suit.toLowerCase() as ApiCard["suit"],
    rank: cardValueToInt(card.value),
  };
}
