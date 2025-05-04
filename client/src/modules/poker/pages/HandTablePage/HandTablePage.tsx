import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState } from "src/store";
import SimulationSettingsForm from "../../components/SimulationSettingsForm";
import { useRunSimulationMutation } from "../../services/api/api";
import { CardSuit, Stat } from "../../types";
import { REVERSED_VALUES } from "../../utils/utils";
import "./HandTablePage.css";
import HandTableVisualization from "./HandTableVisualization";

const HandTablePage = () => {
  const { t } = useTranslation();

  const params = useSelector((state: RootState) => state.poker);
  const [runSimulation] = useRunSimulationMutation();
  const [stats, setStats] = useState<
    Partial<Record<string, { stat?: Stat; isLoading: boolean }>>
  >({});
  const [loadingCount, setLoadingCount] = useState<number>(0);

  const pendingRequests = useRef<AbortController[]>([]);
  const simulateAll = useCallback(async () => {
    const controllers: AbortController[] = [];
    let errors_toasted = 0;
    for (let i = 0; i < REVERSED_VALUES.length; i++) {
      for (let j = 0; j < REVERSED_VALUES.length; j++) {
        const hand = {
          value0: REVERSED_VALUES[i],
          value1: REVERSED_VALUES[j],
          suited: i < j,
        };
        const handStr = hand.value0 + hand.value1 + hand.suited;

        setStats((prev) => ({
          ...prev,
          [handStr]: { stat: prev[handStr]?.stat, isLoading: true },
        }));
        setLoadingCount((prev) => prev + 1);

        const controller = new AbortController();
        controllers.push(controller);
        runSimulation({
          iterations: params.iterationCount,
          players: params.playerCount,
          hand: [
            {
              value: hand.value0,
              suit: CardSuit.HEARTS,
            },
            {
              value: hand.value1,
              suit: hand.suited ? CardSuit.HEARTS : CardSuit.SPADES,
            },
          ],
          signal: controller.signal,
        })
          .unwrap()
          .then((result) => {
            const win = result.reduce((acc, r) => acc + r.win, 0);
            const lose = result.reduce((acc, r) => acc + r.lose, 0);
            const tie = result.reduce((acc, r) => acc + r.tie, 0);
            setStats((prev) => ({
              ...prev,
              [handStr]: { stat: { win, lose, tie }, isLoading: false },
            }));
          })
          .catch((e) => {
            if (
              !(
                e.name === "AbortError" ||
                (e.status === "FETCH_ERROR" &&
                  (e.error as string).includes("aborted"))
              )
            ) {
              console.error(e);
              if (errors_toasted < 1) {
                toast.error(e.error);
                errors_toasted++;
              }
            }
            setStats((prev) => ({
              ...prev,
              [handStr]: { stat: undefined, isLoading: false },
            }));
          })
          .finally(() => {
            setLoadingCount((prev) => prev - 1);
          });
      }
      pendingRequests.current = controllers;
    }
  }, [params, runSimulation]);

  useEffect(() => {
    return () => {
      pendingRequests.current.forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return (
    <Container>
      <h2 className="my-3">{t("pages.handTable.title")}</h2>
      <Row>
        <Col md={4} lg={4}>
          <SimulationSettingsForm />
          <hr />
          <LoadingButton onClick={simulateAll} isLoading={loadingCount !== 0}>
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
