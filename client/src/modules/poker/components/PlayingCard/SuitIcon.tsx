import React from "react";
import { ImClubs, ImDiamonds, ImHeart, ImSpades } from "react-icons/im";
import { RiQuestionMark } from "react-icons/ri";
import { CardSuit } from "../../types";

interface SuitIconProps {
  suit?: CardSuit | null;
}

const SuitIcon: React.FC<SuitIconProps> = ({ suit }) => {
  switch (suit) {
    case CardSuit.CLUBS:
      return <ImClubs />;
    case CardSuit.DIAMONDS:
      return <ImDiamonds />;
    case CardSuit.HEARTS:
      return <ImHeart />;
    case CardSuit.SPADES:
      return <ImSpades />;
    default:
      return <RiQuestionMark />;
  }
};

export default SuitIcon;
