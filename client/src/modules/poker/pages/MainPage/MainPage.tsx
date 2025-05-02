import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card as CardType } from "src/modules/poker/types";
import CommunityCardsBlock from "./CommunityCardsBlock";
import HoleCardsBlock from "./HoleCardsBlock";
import VisualizationBlock from "./VisualizationBlock";

const MainPage = () => {
  const [holeCard0, setHoleCard0] = useState<CardType | null>(null);
  const [holeCard1, setHoleCard1] = useState<CardType | null>(null);

  const [communityCards, setCommunityCards] = useState<(CardType | null)[]>(
    Array(5).fill(null),
  );

  return (
    <Container>
      <h2>Main Page</h2>
      <Row>
        <Col md={6} lg={4}>
          <HoleCardsBlock
            holeCard0={holeCard0}
            holeCard1={holeCard1}
            setHoleCard0={setHoleCard0}
            setHoleCard1={setHoleCard1}
          />

          <CommunityCardsBlock
            holeCard0={holeCard0}
            holeCard1={holeCard1}
            communityCards={communityCards}
            setCommunityCards={setCommunityCards}
          />
        </Col>

        <Col md={6} lg={8}>
          <VisualizationBlock />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
