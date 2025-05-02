import { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GenericApiError } from "src/modules/common/api/types";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setSimulationResult } from "src/store/poker.reducer";
import { useRunSimulationMutation } from "../../services/api/api";
import { cardToApiCard } from "../../services/api/utils";

const SubmitSimulationButton = () => {
  const [runSimulation, { data, isLoading, isError, error }] =
    useRunSimulationMutation();
  const dispatch = useAppDispatch();

  const holeCard0 = useSelector((state: RootState) => state.poker.holeCards[0]);
  const holeCard1 = useSelector((state: RootState) => state.poker.holeCards[1]);
  const communityCards = useSelector(
    (state: RootState) => state.poker.communityCards,
  );
  const submitActive = useMemo(() => {
    if (isLoading) return false;
    if (!holeCard0 || !holeCard1) return false;
    const activeCommunityCards = communityCards.filter((e) => !!e).length;
    if (0 < activeCommunityCards && activeCommunityCards < 3) return false;
    return true;
  }, [holeCard0, holeCard1, communityCards, isLoading]);

  useEffect(() => {
    if (isError) {
      console.error(error);
      if ("data" in error) {
        toast.error(
          (error.data as GenericApiError).title +
            " (check console for more info)",
        );
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      dispatch(setSimulationResult(data));
    }
  }, [data, dispatch]);

  const submit = useCallback(() => {
    if (!holeCard0 || !holeCard1) return;
    runSimulation({
      iterations: 10,
      hand: [cardToApiCard(holeCard0), cardToApiCard(holeCard1)],
      table: communityCards.filter((e) => !!e).map(cardToApiCard),
    });
  }, [communityCards, holeCard0, holeCard1, runSimulation]);

  return (
    <LoadingButton
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!submitActive}
      onClick={submit}
    >
      Submit
    </LoadingButton>
  );
};

export default SubmitSimulationButton;
