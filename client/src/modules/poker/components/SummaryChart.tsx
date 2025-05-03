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

const COLORS = {
  wins: "green",
  losses: "crimson",
  ties: "gray",
};

type SummaryChartProps = {
  data: RunSimulationResponse;
};

const SummaryChart: React.FC<SummaryChartProps> = ({ data }) => {
  const transformedData = useMemo(() => {
    const wins = data.reduce((a, b) => a + b.win, 0);
    const losses = data.reduce((a, b) => a + b.lose, 0);
    const ties = data.reduce((a, b) => a + b.tie, 0);
    return [{ name: "Outcomes", wins, losses, ties }];
  }, [data]);

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
          formatter={(value) =>
            `${value} (${(((value as number) / total) * 100).toFixed(2)}%)`
          }
        />
        <Legend />
        <Bar dataKey="wins" stackId="a" fill={COLORS.wins} />
        <Bar dataKey="losses" stackId="a" fill={COLORS.losses} />
        <Bar dataKey="ties" stackId="a" fill={COLORS.ties} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SummaryChart;
