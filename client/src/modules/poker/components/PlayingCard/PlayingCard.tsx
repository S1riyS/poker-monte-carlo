import clsx from "clsx";
import { Card } from "react-bootstrap";
import { ImClubs, ImDiamonds, ImHeart, ImSpades } from "react-icons/im";
import { RiQuestionMark } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { CardStyle, CardSuit, Card as CardType, CardValue } from "../../types";
import "./PlayingCard.css";

function suitIcon(suit?: CardSuit | null): React.ReactNode {
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
}

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
  const symbol = suitIcon(card?.suit);
  const color = suitColor(card?.suit, deckColors);

  const dimensions = dimensionsMap[size];

  return (
    <Card
      style={{
        ...dimensions,
        ...style,
        color: color,
      }}
      className={clsx(
        "d-flex flex-column justify-content-between p-1",
        "playing-card",
        className,
        {
          clickable: !cardDisabled && clickable,
        },
        {
          disabled: cardDisabled,
        },
        {
          required: required ?? true,
        },
      )}
      {...props}
    >
      {cardStyle === CardStyle.MIRRORED && (
        <>
          <span
            style={{
              fontSize: dimensions.fontSize,
              lineHeight: "1",
              textAlign: "left",
              textDecorationLine:
                card?.value === CardValue.SIX || card?.value === CardValue.NINE
                  ? "underline"
                  : "none",
            }}
          >
            {card?.value ?? ""}
          </span>
          <span style={{ fontSize: dimensions.fontSize, lineHeight: "1" }}>
            {symbol}
          </span>
          <span
            style={{
              fontSize: dimensions.fontSize,
              lineHeight: "1",
              textAlign: "left",
              textDecorationLine:
                card?.value === CardValue.SIX || card?.value === CardValue.NINE
                  ? "underline"
                  : "none",
              transform: "rotate(180deg)",
            }}
          >
            {card?.value ?? ""}
          </span>
        </>
      )}
      {cardStyle === CardStyle.SIMPLE && (
        <>
          {card?.value && (
            <span style={{ fontSize: dimensions.fontSize }}>{card.value}</span>
          )}
          <span style={{ fontSize: dimensions.fontSize }}>{symbol}</span>
        </>
      )}
    </Card>
  );
};

export default PlayingCard;
