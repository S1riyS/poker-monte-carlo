import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import CombinationBreakdownChart from "./CombinationBreakdownChart";
import SummaryChart from "./SummaryChart";
import WinsBreakdownChart from "./WinsBreakdownChart";

const VisualizationBlock = () => {
  const data = useSelector((state: RootState) => state.poker.simulationResult);

  return (
    <Card>
      <Card.Header>Visualization</Card.Header>
      <Card.Body>
        {data ? (
          <>
            <h3>Summary</h3>
            <SummaryChart data={data} />
            <h3>Wins Breakdown</h3>
            <WinsBreakdownChart data={data} />
            <h3>Combination Breakdown</h3>
            <CombinationBreakdownChart data={data} />
          </>
        ) : (
          <p className="text-muted text-center">no data</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default VisualizationBlock;
