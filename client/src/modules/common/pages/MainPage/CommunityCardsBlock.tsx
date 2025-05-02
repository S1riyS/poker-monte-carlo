import React, { useMemo, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import CardSelector from "src/modules/poker/components/CardSelector/CardSelector";
import { Card as CardType } from "src/modules/poker/types";

interface CommunityCardsBlockProps {
  holeCard0?: CardType | null;
  holeCard1?: CardType | null;
  communityCards: (CardType | null)[];
  setCommunityCards: (cards: (CardType | null)[]) => void;
}

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
    if (i < 5) {
      return { cardDisabled: false, required: false };
    }
    return { cardDisabled: true, required: false };
  }
  return { cardDisabled: false, required: false };
}

const CommunityCardsBlock: React.FC<CommunityCardsBlockProps> = ({
  holeCard0,
  holeCard1,
  communityCards,
  setCommunityCards,
}) => {
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

  return (
    <Card>
      <Card.Header>Select community cards</Card.Header>
      {communityCardsEnabled && (
        <Card.Body className="d-flex flex-wrap">
          {communityCards.map((card, i) => (
            <CardSelector
              key={`community-card-${i}`}
              className="m-1"
              card={card}
              onCardSelect={(card) => {
                const newCards = [...communityCards];
                newCards[i] = card;
                setCommunityCards(newCards);
              }}
              disabledCards={communityCards.concat([
                holeCard0 ?? null,
                holeCard1 ?? null,
              ])}
              onCardReset={() =>
                setCommunityCards(
                  communityCards.map((card, ri) => (i === ri ? null : card)),
                )
              }
              {...cardsState[i]}
            />
          ))}
        </Card.Body>
      )}
      <Card.Footer as="div" className="d-flex justify-content-between">
        <Form.Check
          type="checkbox"
          checked={communityCardsEnabled}
          label="Enable"
          onChange={(e) => {
            setCommunityCardsEnabled(e.target.checked);
            if (!e.target.checked) {
              setCommunityCards(Array(5).fill(null));
            }
          }}
        />
        {communityCardsEnabled && (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setCommunityCards(Array(5).fill(null))}
          >
            Reset
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default CommunityCardsBlock;
