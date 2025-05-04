import { useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GenericApiError } from "src/modules/common/api/types";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setSimulationResult } from "src/store/poker.reducer";
import { useRunSimulationMutation } from "../services/api/api";

const SubmitSimulationButton = () => {
  const [runSimulation, { data, isLoading, isError, error }] =
    useRunSimulationMutation();
  const dispatch = useAppDispatch();

  const params = useSelector((state: RootState) => state.poker);
  const submitActive = useMemo(() => {
    if (isLoading) return false;
    if (!params.holeCards[0] || !params.holeCards[1]) return false;
    const activeCommunityCards = params.communityCards.filter(
      (e) => !!e,
    ).length;
    if (0 < activeCommunityCards && activeCommunityCards < 3) return false;
    return true;
  }, [params, isLoading]);

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
    if (!params.holeCards[0] || !params.holeCards[1]) return;
    runSimulation({
      iterations: params.iterationCount,
      players: params.playerCount,
      hand: [params.holeCards[0], params.holeCards[1]],
      table: params.communityCards.filter((e) => !!e),
    });
  }, [params, runSimulation]);

  return (
    <LoadingButton
      id="submit-sim-btn"
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
