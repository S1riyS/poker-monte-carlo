import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardSelector from "src/modules/poker/components/CardSelector/CardSelector";
import { Card as CardType } from "src/modules/poker/types";
import { RootState, useAppDispatch } from "src/store";
import { setHoleCard } from "src/store/poker.reducer";

const HoleCardsBlock: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const communityCards = useSelector(
    (state: RootState) => state.poker.communityCards,
  );
  const setHoleCard0 = (card: CardType | null) =>
    dispatch(setHoleCard({ index: 0, card }));
  const setHoleCard1 = (card: CardType | null) =>
    dispatch(setHoleCard({ index: 1, card }));

  return (
    <Card className="mb-3">
      <Card.Header>{t("pages.main.selectHoleCards")}</Card.Header>
      <Card.Body>
        <div className="d-flex">
          <CardSelector
            card={holeCard0}
            onCardSelect={setHoleCard0}
            className="m-1"
            disabledCards={[holeCard0, holeCard1].concat(communityCards)}
            onCardReset={() => setHoleCard0(null)}
          />
          <CardSelector
            card={holeCard1}
            onCardSelect={setHoleCard1}
            className="m-1"
            disabledCards={[holeCard0, holeCard1].concat(communityCards)}
            onCardReset={() => setHoleCard1(null)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default HoleCardsBlock;
