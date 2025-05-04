import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RunSimulationResponse } from "../services/api/types";

const COLORS = {
  wins: "green",
  loses: "crimson",
  ties: "gray",
};

type SummaryChartProps = {
  data: RunSimulationResponse;
};

const SummaryChart: React.FC<SummaryChartProps> = ({ data }) => {
  const { t } = useTranslation();

  const transformedData = useMemo(() => {
    const wins = data.reduce((a, b) => a + b.win, 0);
    const loses = data.reduce((a, b) => a + b.lose, 0);
    const ties = data.reduce((a, b) => a + b.tie, 0);
    return [{ name: t("poker.outcomes.name"), wins, loses, ties }];
  }, [data, t]);

  const total = useMemo(() => {
    return data.reduce((a, b) => a + b.win + b.lose + b.tie, 0);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart layout="vertical" data={transformedData}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip
          wrapperStyle={{ zIndex: 99999 }}
          labelFormatter={() => t("poker.outcomes.name")}
          formatter={(value, name) => [
            `${value} (${(((value as number) / total) * 100).toFixed(2)}%)`,
            t(`poker.outcomes.${name}`),
          ]}
        />
        <Legend formatter={(value) => t(`poker.outcomes.${value}`)} />
        <Bar dataKey="wins" stackId="a" fill={COLORS.wins} />
        <Bar dataKey="loses" stackId="a" fill={COLORS.loses} />
        <Bar dataKey="ties" stackId="a" fill={COLORS.ties} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SummaryChart;
