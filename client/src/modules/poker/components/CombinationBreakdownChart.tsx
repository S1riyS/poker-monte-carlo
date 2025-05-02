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
    if (!data) return [];
    return data.map((e) => ({
      name: combinationToHumanName(e.name),
      wins: e.win,
      losses: e.lose,
      ties: e.tie,
    }));
  }, [data]);

  if (!data) return <span>summary chart: no data</span>;
  return (
    <ResponsiveContainer width="100%" height={transformedData.length * 40}>
      <BarChart layout="vertical" data={transformedData}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="wins" stackId="c" fill={COLORS.wins} />
        <Bar dataKey="losses" stackId="c" fill={COLORS.losses} />
        <Bar dataKey="ties" stackId="c" fill={COLORS.ties} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CombinationBreakdownChart;
