import { useMemo } from "react";
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
import { PokerCombinationName } from "../types";
import { combinationToHumanName } from "../utils/utils";

const COLORS = {
  wins: "green",
  losses: "crimson",
  ties: "gray",
};

type CombinationBreakdownChartProps = {
  data: RunSimulationResponse;
};

const CombinationBreakdownChart: React.FC<CombinationBreakdownChartProps> = ({
  data,
}) => {
  const transformedData = useMemo(() => {
    return data.map((e) => ({
      name: combinationToHumanName(e.name),
      wins: e.win,
      losses: e.lose,
      ties: e.tie,
    }));
  }, [data]);

  const totals: { [K in PokerCombinationName]: number } = useMemo(() => {
    return transformedData.reduce((a, b) => {
      return {
        ...a,
        [b.name]: b.wins + b.losses + b.ties,
      };
    }, {}) as { [K in PokerCombinationName]: number };
  }, [transformedData]);

  return (
    <ResponsiveContainer width="100%" height={40 + transformedData.length * 40}>
      <BarChart layout="vertical" data={transformedData}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip
          wrapperStyle={{ zIndex: 99999 }}
          formatter={(value, _, item) => {
            const total = totals[item.payload.name as PokerCombinationName];
            if (!total) return value;
            return `${value} (${(((value as number) / total) * 100).toFixed(2)}%)`;
          }}
        />
        <Legend />
        <Bar dataKey="wins" stackId="c" fill={COLORS.wins} />
        <Bar dataKey="losses" stackId="c" fill={COLORS.losses} />
        <Bar dataKey="ties" stackId="c" fill={COLORS.ties} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CombinationBreakdownChart;
