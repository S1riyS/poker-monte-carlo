import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import CombinationBreakdownChart from "./CombinationBreakdownChart";
import CombinationsChart from "./CombinationsChart";
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
            <h6 className="text-muted">
              How often the hand wins, loses or ties
            </h6>
            <SummaryChart data={data} />
            <h3>Combinations</h3>
            <h6 className="text-muted">
              How often each combination appears (regardless of outcome)
            </h6>
            <CombinationsChart data={data} />
            <h3>Wins Breakdown</h3>
            <h6 className="text-muted">In which combination the hand wins</h6>
            <WinsBreakdownChart data={data} />
            <h3>Combination Breakdown</h3>
            <h6 className="text-muted">
              Hand's outcomes for each combination it comprises
            </h6>
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
