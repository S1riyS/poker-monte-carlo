import clsx from "clsx";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { CardStyle, CardSuit, Card as CardType } from "../../types";
import "./PlayingCard.css";
import SuitIcon from "./SuitIcon";
import ValueIcon from "./ValueIcon";

function suitColor(suit?: CardSuit | null, deckColors?: 2 | 4): string {
  switch (suit) {
    case CardSuit.CLUBS:
      return deckColors === 4 ? "#17b717" : "black";
    case CardSuit.DIAMONDS:
      return deckColors === 4 ? "#4747ea" : "red";
    case CardSuit.HEARTS:
      return "red";
    case CardSuit.SPADES:
      return "black";
    default:
      return "gray";
  }
}

export interface PlayingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  card?: CardType | null;
  size?: "xs" | "sm" | "lg";
  clickable?: boolean;
  cardDisabled?: boolean;
  required?: boolean;
}

const dimensionsMap = {
  xs: { width: "40px", height: "60px", fontSize: "1rem" },
  sm: { width: "60px", height: "90px", fontSize: "1.5rem" },
  lg: { width: "100px", height: "140px", fontSize: "2rem" },
};

const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  size = "sm",
  style,
  className,
  clickable,
  cardDisabled,
  required,
  ...props
}) => {
  const cardStyle = useSelector((state: RootState) => state.settings.cardStyle);
  const deckColors = useSelector(
    (state: RootState) => state.settings.deckColors,
  );
  const color = suitColor(card?.suit, deckColors);

  const dimensions = dimensionsMap[size];

  return (
    <Card
      style={{
        ...dimensions,
        ...style,
        color: color,
      }}
      className={clsx("d-flex flex-column p-1 playing-card", className, {
        clickable: !cardDisabled && clickable,
        disabled: cardDisabled,
        required: required ?? true,
        "justify-content-center": !card,
        "justify-content-between": !!card,
      })}
      {...props}
    >
      {cardStyle === CardStyle.MIRRORED && (
        <>
          {card && (
            <ValueIcon
              value={card.value}
              underlineAmbigous
              textAlign="left"
              style={{ fontSize: dimensions.fontSize }}
            />
          )}
          <span style={{ fontSize: dimensions.fontSize, lineHeight: "1" }}>
            <SuitIcon suit={card?.suit} />
          </span>
          {card && (
            <ValueIcon
              value={card.value}
              underlineAmbigous
              textAlign="left"
              flipped
              style={{ fontSize: dimensions.fontSize }}
            />
          )}
        </>
      )}
      {cardStyle === CardStyle.SIMPLE && (
        <>
          {card && (
            <ValueIcon
              value={card.value}
              style={{ fontSize: dimensions.fontSize }}
            />
          )}
          <span style={{ fontSize: dimensions.fontSize }}>
            <SuitIcon suit={card?.suit} />
          </span>
        </>
      )}
    </Card>
  );
};

export default PlayingCard;
