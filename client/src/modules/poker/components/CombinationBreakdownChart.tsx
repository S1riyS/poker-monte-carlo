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
import { PokerCombination } from "../types";

const COLORS = {
  wins: "green",
  loses: "crimson",
  ties: "gray",
};

type CombinationBreakdownChartProps = {
  data: RunSimulationResponse;
};

const CombinationBreakdownChart: React.FC<CombinationBreakdownChartProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const transformedData = useMemo(() => {
    return data.map((e) => ({
      name: e.name,
      wins: e.win,
      loses: e.lose,
      ties: e.tie,
    }));
  }, [data]);

  const totals: { [K in PokerCombination]: number } = useMemo(() => {
    return transformedData.reduce((a, b) => {
      return {
        ...a,
        [b.name]: b.wins + b.loses + b.ties,
      };
    }, {}) as { [K in PokerCombination]: number };
  }, [transformedData]);

  return (
    <ResponsiveContainer width="100%" height={40 + transformedData.length * 40}>
      <BarChart layout="vertical" data={transformedData}>
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          tickFormatter={(v) => t("poker.combination." + v)}
        />
        <Tooltip
          wrapperStyle={{ zIndex: 99999 }}
          labelFormatter={(value) => t("poker.combination." + value)}
          formatter={(value, name, item) => {
            const total = totals[item.payload.name as PokerCombination];
            return [
              total
                ? `${value} (${(((value as number) / total) * 100).toFixed(2)}%)`
                : value,
              t("poker.outcomes." + name),
            ];
          }}
        />
        <Legend formatter={(value) => t("poker.outcomes." + value)} />
        <Bar dataKey="wins" stackId="c" fill={COLORS.wins} />
        <Bar dataKey="loses" stackId="c" fill={COLORS.loses} />
        <Bar dataKey="ties" stackId="c" fill={COLORS.ties} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CombinationBreakdownChart;
