import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import CombinationBreakdownChart from "./CombinationBreakdownChart";
import CombinationsChart from "./CombinationsChart";
import SummaryChart from "./SummaryChart";
import WinsBreakdownChart from "./WinsBreakdownChart";

const VisualizationBlock = () => {
  const { t } = useTranslation();

  const data = useSelector((state: RootState) => state.poker.simulationResult);

  return (
    <Card>
      <Card.Header>{t("pages.main.visualization")}</Card.Header>
      <Card.Body>
        {data ? (
          <>
            <h3>{t("pages.main.charts.summary.name")}</h3>
            <h6 className="text-muted">
              {t("pages.main.charts.summary.description")}
            </h6>
            <SummaryChart data={data} />
            <h3>{t("pages.main.charts.combinations.name")}</h3>
            <h6 className="text-muted">
              {t("pages.main.charts.combinations.description")}
            </h6>
            <CombinationsChart data={data} />
            <h3>{t("pages.main.charts.winsBreakdown.name")}</h3>
            <h6 className="text-muted">
              {t("pages.main.charts.winsBreakdown.description")}
            </h6>
            <WinsBreakdownChart data={data} />
            <h3>{t("pages.main.charts.combinationBreakdown.name")}</h3>
            <h6 className="text-muted">
              {t("pages.main.charts.combinationBreakdown.description")}
            </h6>
            <CombinationBreakdownChart data={data} />
          </>
        ) : (
          <p className="text-muted text-center">{t("common.noData")}</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default VisualizationBlock;
