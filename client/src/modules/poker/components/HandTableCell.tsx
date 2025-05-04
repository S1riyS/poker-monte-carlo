import React, { useMemo } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { GeneralPokerHand, Stat } from "../types";
import { generalPokerHandToString } from "../utils/utils";

interface HandTableCellProps {
  hand: GeneralPokerHand;
  stat?: Stat | null;
  isLoading?: boolean;
}

const HandTableCell: React.FC<HandTableCellProps> = ({
  stat,
  hand: { value0, value1, suited },
  isLoading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handStr = useMemo(
    () => generalPokerHandToString({ value0, value1, suited }),
    [suited, value0, value1],
  );
  const total = useMemo(
    () => (stat ? stat.win + stat.lose + stat.tie : 0),
    [stat],
  );
  const winPct = useMemo(
    () => (stat ? (stat.win / total) * 100 : 0),
    [stat, total],
  );
  const losePct = useMemo(
    () => (stat ? (stat.lose / total) * 100 : 0),
    [stat, total],
  );
  const tiePct = useMemo(
    () => (stat ? (stat.tie / total) * 100 : 0),
    [stat, total],
  );

  const getBarBackground = useMemo((): string | undefined => {
    return `linear-gradient(to right, 
      green 0%, 
      green ${winPct}%,
      crimson ${winPct}%,
      crimson ${winPct + losePct}%,
      gray ${winPct + losePct}%,
      gray 100%)`;
  }, [losePct, winPct]);

  const tooltipContent = (
    <Tooltip id={`tooltip-${handStr}`}>
      <div style={{ fontSize: "0.8rem" }}>
        <div>
          <strong>{handStr}</strong>
        </div>
        {stat ? (
          <>
            <div style={{ color: "green" }}>
              Win: {stat.win} ({winPct.toFixed(2)}%)
            </div>
            <div style={{ color: "crimson" }}>
              Lose: {stat.lose} ({losePct.toFixed(2)}%)
            </div>
            <div style={{ color: "gray" }}>
              Tie: {stat.tie} ({tiePct.toFixed(2)}%)
            </div>
          </>
        ) : (
          <div>{t("common.noData")}</div>
        )}
      </div>
    </Tooltip>
  );

  const handleClick = () => {
    navigate("/", {
      state: {
        holeCards: [
          { value: value0, suit: "HEARTS" },
          { value: value1, suit: suited ? "HEARTS" : "SPADES" },
        ],
        autoRun: true,
      },
    });
  };

  return (
    <OverlayTrigger
      placement="top"
      overlay={tooltipContent}
      popperConfig={{
        modifiers: [
          { name: "preventOverflow", options: { boundary: "viewport" } },
        ],
      }}
    >
      <td
        style={{
          background: getBarBackground,
          color: stat ? "white" : "black",
          position: "relative",
          padding: 0,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <div style={{ padding: "0.5rem" }}>{handStr}</div>
        {isLoading && (
          <div
            style={{
              color: "white",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Spinner animation="border" size="sm" />
          </div>
        )}
      </td>
    </OverlayTrigger>
  );
};

export default HandTableCell;
