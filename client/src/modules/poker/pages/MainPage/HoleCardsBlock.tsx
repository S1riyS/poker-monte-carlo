import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardSelector from "src/modules/poker/components/CardSelector/CardSelector";
import { Card as CardType } from "src/modules/poker/types";
import { RootState, useAppDispatch } from "src/store";
import { setHoleCard } from "src/store/poker.reducer";

const HoleCardsBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const setHoleCard0 = (card: CardType | null) =>
    dispatch(setHoleCard({ index: 0, card }));
  const setHoleCard1 = (card: CardType | null) =>
    dispatch(setHoleCard({ index: 1, card }));

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
