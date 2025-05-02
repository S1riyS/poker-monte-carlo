import { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const SubmitSimulationButton = () => {
  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const communityCards = useSelector(
    (state: RootState) => state.poker.communityCards,
  );
  const submitActive = useMemo(() => {
    if (!holeCard0 || !holeCard1) return false;
    const activeCommunityCards = communityCards.filter((e) => !!e).length;
    if (0 < activeCommunityCards && activeCommunityCards < 3) return false;
    return true;
  }, [holeCard0, holeCard1, communityCards]);

  return (
    <Button type="submit" variant="primary" disabled={!submitActive}>
      Submit
    </Button>
  );
};

export default SubmitSimulationButton;
