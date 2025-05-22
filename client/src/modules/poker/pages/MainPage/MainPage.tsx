import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Card as CardType } from "src/modules/poker/types";
import { useAppDispatch } from "src/store";
import { setHoleCards, setSimulationResult } from "src/store/poker.reducer";
import CommunityCardsBlock from "../../components/CommunityCardsBlock";
import HoleCardsBlock from "../../components/HoleCardsBlock";
import SimulationSettingsForm from "../../components/SimulationSettingsForm";
import SubmitSimulationButton from "../../components/SubmitSimulationButton";
import VisualizationBlock from "../../components/VisualizationBlock";

const MainPage = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = location.state as {
      holeCards?: [CardType, CardType];
      autoRun?: boolean;
    };

    if (state?.holeCards && state.holeCards[0] && state.holeCards[1]) {
      dispatch(
        setHoleCards({ holeCards: [state.holeCards[0], state.holeCards[1]] }),
      );
      dispatch(setSimulationResult(null));
    }

    if (state?.autoRun) {
      document.getElementById("submit-sim-btn")?.click();
    }
  }, [location, dispatch]);

  return (
    <Container>
      <h2>
        {t("pages.main.title")}
        {__APP_VERSION__ && (
          <span className="text-muted"> v{__APP_VERSION__}</span>
        )}
      </h2>
      <Row>
        <Col md={6} lg={4}>
          <HoleCardsBlock />
          <CommunityCardsBlock />
          <SimulationSettingsForm />
          <hr />
          <SubmitSimulationButton />
        </Col>

        <Col md={6} lg={8}>
          <VisualizationBlock />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
