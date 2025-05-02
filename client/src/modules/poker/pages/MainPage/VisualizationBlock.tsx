import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const VisualizationBlock = () => {
  const data = useSelector((state: RootState) => state.poker.simulationResult);

  return (
    <Card>
      <Card.Header>Visualization</Card.Header>
      <Card.Body>
        {data ? (
          <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        ) : (
          "No data"
        )}
      </Card.Body>
    </Card>
  );
};

export default VisualizationBlock;
