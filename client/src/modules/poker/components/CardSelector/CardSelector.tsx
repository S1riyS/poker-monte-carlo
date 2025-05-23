import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Card as CardType } from "../../types";
import { SORTED_SUITS, SORTED_VALUES } from "../../utils/utils";
import PlayingCard, { PlayingCardProps } from "../PlayingCard/PlayingCard";
import "./CardSelector.css";

interface CardSelectorProps extends PlayingCardProps {
  onCardSelect: (card: CardType) => void;
  disabledCards?: (CardType | null)[];
  onCardReset?: () => void;
}

const CardList: React.FC<{
  onCardSelect: (card: CardType) => void;
  setVisible: (visible: boolean) => void;
  disabledCards?: (CardType | null)[];
}> = ({ onCardSelect, setVisible, disabledCards }) => {
  return (
    <div className="d-flex flex-column space-y-2">
      {SORTED_SUITS.map((suit) => (
        <div key={suit} className="d-flex flex-wrap">
          {SORTED_VALUES.map((value) => {
            const disabled = disabledCards?.some(
              (card) => card && card.value === value && card.suit === suit,
            );
            return (
              <PlayingCard
                key={`${value}-${suit}`}
                card={{ value, suit }}
                onClick={
                  disabled
                    ? () => {}
                    : () => {
                        onCardSelect({ value, suit });
                        setVisible(false);
                      }
                }
                className="flex-shrink-0"
                size="xs"
                cardDisabled={disabled}
                clickable
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const CardSelector: React.FC<CardSelectorProps> = ({
  onCardSelect,
  disabledCards,
  onCardReset,
  cardDisabled,
  ...props
}) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!tooltipContainerRef.current?.contains(target)) {
        setTimeout(() => setVisible(false), 0);
      }
    };

    if (visible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [visible]);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setVisible(!visible);
    targetRef.current = event.target as HTMLDivElement;
  };

  return (
    <div ref={tooltipContainerRef}>
      <PlayingCard
        onClick={handleClick}
        clickable
        cardDisabled={cardDisabled}
        {...props}
      />
      <Overlay
        show={!cardDisabled && visible}
        target={targetRef}
        placement="bottom"
        container={tooltipContainerRef}
        containerPadding={20}
      >
        <Popover className="wide-popover">
          <Popover.Header as="div" className="d-flex justify-content-between">
            <span>{t("poker.selectCard")}</span>
            {onCardReset && (
              <Button size="sm" variant="outline-danger" onClick={onCardReset}>
                {t("common.reset")}
              </Button>
            )}
          </Popover.Header>
          <Popover.Body className="p-0">
            <CardList
              onCardSelect={onCardSelect}
              setVisible={setVisible}
              disabledCards={disabledCards}
            />
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default CardSelector;
