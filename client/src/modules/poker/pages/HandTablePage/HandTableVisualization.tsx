import React from "react";
import { Card, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import HandTableCell from "../../components/HandTableCell";
import { Stat } from "../../types";
import { generalPokerHandToString, REVERSED_VALUES } from "../../utils/utils";
import "./HandTablePage.css";

interface HandTableVisualizationProps {
  stats: Partial<Record<string, { stat?: Stat; isLoading: boolean }>>;
}

const HandTableVisualization: React.FC<HandTableVisualizationProps> = ({
  stats,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Header>{t("pages.handTable.visualization")}</Card.Header>
      <Card.Body>
        <Table
          className="hand-table mx-auto"
          style={{ tableLayout: "fixed", textAlign: "center" }}
        >
          <tbody>
            {REVERSED_VALUES.map((value0, i0) => (
              <tr key={value0}>
                {REVERSED_VALUES.map((value1, i1) => {
                  const k = generalPokerHandToString({
                    value0,
                    value1,
                    suited: i0 < i1,
                  });
                  return (
                    <HandTableCell
                      key={`${value0}-${value1}`}
                      hand={{ value0, value1, suited: i0 < i1 }}
                      stat={stats[k]?.stat}
                      isLoading={stats[k]?.isLoading}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HandTableVisualization;
