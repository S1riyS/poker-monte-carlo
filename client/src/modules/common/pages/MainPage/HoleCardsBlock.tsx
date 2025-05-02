import React from "react";
import { Card } from "react-bootstrap";
import CardSelector from "src/modules/poker/components/CardSelector/CardSelector";
import { Card as CardType } from "src/modules/poker/types";

interface HoleCardsBlockProps {
  holeCard0: CardType | null;
  holeCard1: CardType | null;
  setHoleCard0: (card: CardType | null) => void;
  setHoleCard1: (card: CardType | null) => void;
}

const HoleCardsBlock: React.FC<HoleCardsBlockProps> = ({
  holeCard0,
  holeCard1,
  setHoleCard0,
  setHoleCard1,
}) => {
  return (
    <Card className="mb-3">
      <Card.Header>Select hole cards</Card.Header>
      <Card.Body>
        <div className="d-flex">
          <CardSelector
            card={holeCard0}
            onCardSelect={setHoleCard0}
            className="m-1"
            disabledCards={[holeCard0, holeCard1].filter((e) => !!e)}
            onCardReset={() => setHoleCard0(null)}
          />
          <CardSelector
            card={holeCard1}
            onCardSelect={setHoleCard1}
            className="m-1"
            disabledCards={[holeCard0, holeCard1]}
            onCardReset={() => setHoleCard1(null)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default HoleCardsBlock;
