import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const SubmitSimulationButton = () => {
  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const submitActive = useMemo(() => {
    return holeCard0 && holeCard1;
  }, [holeCard0, holeCard1]);

  return (
    <Button type="submit" variant="primary" disabled={!submitActive}>
      Submit
    </Button>
  );
};

export default SubmitSimulationButton;
