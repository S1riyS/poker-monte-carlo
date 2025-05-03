import { Col, Container, Row } from "react-bootstrap";
import CommunityCardsBlock from "../../components/CommunityCardsBlock";
import HoleCardsBlock from "../../components/HoleCardsBlock";
import SimulationSettingsForm from "../../components/SimulationSettingsForm";
import SubmitSimulationButton from "../../components/SubmitSimulationButton";
import VisualizationBlock from "../../components/VisualizationBlock";

const MainPage = () => {
  return (
    <Container>
      <h2>Main Page</h2>
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
