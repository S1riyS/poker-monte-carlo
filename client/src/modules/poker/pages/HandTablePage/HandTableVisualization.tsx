import React from "react";
import { Card, Table } from "react-bootstrap";
import HandTableCell from "../../components/HandTableCell";
import { Stat } from "../../types";
import { REVERSED_VALUES } from "../../utils/utils";
import "./HandTablePage.css";

interface HandTableVisualizationProps {
  stats: Partial<Record<string, { stat?: Stat; isLoading: boolean }>>;
}

const HandTableVisualization: React.FC<HandTableVisualizationProps> = ({
  stats,
}) => {
  return (
    <Card>
      <Card.Header>Hand Table</Card.Header>
      <Card.Body>
        <Table
          bordered
          className="hand-table mx-auto"
          style={{ tableLayout: "fixed", textAlign: "center" }}
        >
          <tbody>
            {REVERSED_VALUES.map((value0, i0) => (
              <tr key={value0}>
                {REVERSED_VALUES.map((value1, i1) => (
                  <HandTableCell
                    key={`${value0}-${value1}`}
                    hand={{ value0, value1, suited: i0 < i1 }}
                    stat={stats[value0 + value1 + (i0 < i1)]?.stat}
                    isLoading={stats[value0 + value1 + (i0 < i1)]?.isLoading}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HandTableVisualization;
