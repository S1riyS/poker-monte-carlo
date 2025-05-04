import React, { useCallback, useMemo, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardSelector from "src/modules/poker/components/CardSelector/CardSelector";
import { Card as CardType } from "src/modules/poker/types";
import { RootState, useAppDispatch } from "src/store";
import {
  removeIthComminityCard as removeIthComminityCardAction,
  resetCommunityCards as resetCommunityCardsAction,
  setCommunityCard as setCommunityCardAction,
} from "src/store/poker.reducer";

function getCardState(
  i: number,
  communityCards: (CardType | null)[],
): { cardDisabled: boolean; required: boolean } {
  const activeCards = communityCards.filter((card) => !!card).length;
  if (activeCards < 3) {
    if (i < 3) {
      return { cardDisabled: false, required: true };
    }
    return { cardDisabled: true, required: false };
  } else if (activeCards == 3) {
    if (i < 3) {
      return { cardDisabled: false, required: false };
    } else if (i == 3) {
      return { cardDisabled: false, required: true };
    }
    return { cardDisabled: true, required: false };
  } else if (activeCards == 4) {
    if (i < 4) {
      return { cardDisabled: false, required: false };
    } else if (i == 4) {
      return { cardDisabled: false, required: true };
    }
    return { cardDisabled: true, required: false };
  }
  return { cardDisabled: false, required: false };
}

const CommunityCardsBlock: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const communityCards = useSelector(
    (state: RootState) => state.poker.communityCards,
  );
  const setCommunityCard = useCallback(
    (index: number, card: CardType | null) =>
      dispatch(setCommunityCardAction({ index, card })),
    [dispatch],
  );
  const resetCommunityCards = useCallback(() => {
    dispatch(resetCommunityCardsAction());
  }, [dispatch]);

  const [communityCardsEnabled, setCommunityCardsEnabled] =
    useState<boolean>(false);

  const cardsState = useMemo(() => {
    const ans: {
      cardDisabled: boolean;
      required: boolean;
    }[] = [];
    for (let i = 0; i < 5; i++) {
      ans.push(getCardState(i, communityCards));
    }
    return ans;
  }, [communityCards]);

  const resetIthCommunityCard = useCallback(
    (i: number) => {
      dispatch(removeIthComminityCardAction(i));
    },
    [dispatch],
  );

  return (
    <Card className="mb-3">
      <Card.Header>{t("pages.main.selectCommunityCards")}</Card.Header>
      {communityCardsEnabled && (
        <Card.Body className="d-flex flex-wrap">
          {communityCards.map((card, i) => (
            <CardSelector
              key={`community-card-${i}`}
              className="m-1"
              card={card}
              onCardSelect={(card) => setCommunityCard(i, card)}
              disabledCards={communityCards.concat([
                holeCard0 ?? null,
                holeCard1 ?? null,
              ])}
              onCardReset={() => resetIthCommunityCard(i)}
              {...cardsState[i]}
            />
          ))}
        </Card.Body>
      )}
      <Card.Footer as="div" className="d-flex justify-content-between">
        <Form.Check
          type="checkbox"
          checked={communityCardsEnabled}
          label={t("common.enable")}
          onChange={(e) => {
            setCommunityCardsEnabled(e.target.checked);
            if (!e.target.checked) {
              resetCommunityCards();
            }
          }}
        />
        {communityCardsEnabled && (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => resetCommunityCards()}
          >
            {t("common.reset")}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default CommunityCardsBlock;
