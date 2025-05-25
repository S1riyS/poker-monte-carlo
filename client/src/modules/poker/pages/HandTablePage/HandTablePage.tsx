import { useCallback, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState } from "src/store";
import SimulationSettingsForm from "../../components/SimulationSettingsForm";
import { useRunTableMutation } from "../../services/api/api";
import { Stat } from "../../types";
import { generalPokerHandToString, SORTED_VALUES } from "../../utils/utils";
import "./HandTablePage.css";
import HandTableVisualization from "./HandTableVisualization";

const HandTablePage = () => {
  const { t } = useTranslation();

  const params = useSelector((state: RootState) => state.poker);
  const [runTable, { isLoading }] = useRunTableMutation();
  const [stats, setStats] = useState<
    Partial<Record<string, { stat?: Stat; isLoading: boolean }>>
  >(
    Object.fromEntries(
      SORTED_VALUES.flatMap((value0, i0) =>
        SORTED_VALUES.map((value1, i1) => [
          generalPokerHandToString({
            value0,
            value1,
            suited: i0 < i1,
          }),
          { stat: undefined, isLoading: false },
        ]),
      ),
    ),
  );

  const simulateAll = useCallback(() => {
    setStats(
      Object.fromEntries(
        Object.keys(stats).map((key) => [
          key,
          { isLoading: true, stat: stats[key]?.stat },
        ]),
      ),
    );
    runTable({ iterations: params.iterationCount, players: params.playerCount })
      .unwrap()
      .then((res) => {
        console.log("table res", res);
        const newStats: typeof stats = {};
        for (const stat of res.data) {
          newStats[
            generalPokerHandToString({
              value0: stat.hand[0].value,
              value1: stat.hand[1].value,
              suited: stat.hand[0].suit === stat.hand[1].suit,
            })
          ] = { stat: { ...stat.results }, isLoading: false };
        }
        setStats(newStats);
      });
  }, [params.iterationCount, params.playerCount, runTable, stats]);

  return (
    <Container>
      <h2 className="my-3">{t("pages.handTable.title")}</h2>
      <Row>
        <Col md={4} lg={4}>
          <SimulationSettingsForm />
          <hr />
          <LoadingButton onClick={simulateAll} isLoading={isLoading}>
            {t("pages.handTable.simulateAll")}
          </LoadingButton>
        </Col>

        <Col md={8} lg={8}>
          <HandTableVisualization stats={stats} />
        </Col>
      </Row>
    </Container>
  );
};

export default HandTablePage;
