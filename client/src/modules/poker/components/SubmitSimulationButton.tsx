import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatApiError } from "src/modules/common/api/utils";
import LoadingButton from "src/modules/common/components/LoadingButton";
import { RootState, useAppDispatch } from "src/store";
import { setSimulationResult } from "src/store/poker.reducer";
import { useRunSimulationMutation } from "../services/api/api";

const SubmitSimulationButton = () => {
  const { t } = useTranslation();

  const [runSimulation, { isLoading }] = useRunSimulationMutation();
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

  const submit = useCallback(() => {
    if (!params.holeCards[0] || !params.holeCards[1]) return;
    runSimulation({
      iterations: params.iterationCount,
      players: params.playerCount,
      hand: [params.holeCards[0], params.holeCards[1]],
      table: params.communityCards.filter((e) => !!e),
    })
      .unwrap()
      .then((res) => {
        dispatch(setSimulationResult(res));
      })
      .catch((error) => {
        toast.error(formatApiError(error, t));
      });
  }, [
    dispatch,
    params.communityCards,
    params.holeCards,
    params.iterationCount,
    params.playerCount,
    runSimulation,
    t,
  ]);

  return (
    <LoadingButton
      id="submit-sim-btn"
      isLoading={isLoading}
      type="submit"
      variant="primary"
      disabled={!submitActive}
      onClick={submit}
    >
      {t("pages.main.runSimulation")}
    </LoadingButton>
  );
};

export default SubmitSimulationButton;
