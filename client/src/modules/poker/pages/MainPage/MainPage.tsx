import { Col, Container, Row } from "react-bootstrap";
import CommunityCardsBlock from "./CommunityCardsBlock";
import HoleCardsBlock from "./HoleCardsBlock";
import VisualizationBlock from "./VisualizationBlock";

const MainPage = () => {
  return (
    <Container>
      <h2>Main Page</h2>
      <Row>
        <Col md={6} lg={4}>
          <HoleCardsBlock />

          <CommunityCardsBlock />
        </Col>

        <Col md={6} lg={8}>
          <VisualizationBlock />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
