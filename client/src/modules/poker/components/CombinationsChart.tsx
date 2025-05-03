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
import { PokerCombination, PokerCombinationName } from "../types";
import { combinationToHumanName, SORTED_COMBINATIONS } from "../utils/utils";

const COLORS: Record<string, string> = {
  [combinationToHumanName(PokerCombination.HIGH_CARD)]: "#6c757d", // Gray
  [combinationToHumanName(PokerCombination.PAIR)]: "#dc3545", // Crimson red
  [combinationToHumanName(PokerCombination.TWO_PAIRS)]: "#adb5bd", // Lighter gray
  [combinationToHumanName(PokerCombination.THREE_OF_A_KIND)]: "#0d6efd", // Blue
  [combinationToHumanName(PokerCombination.STRAIGHT)]: "#ffc107", // Yellow
  [combinationToHumanName(PokerCombination.FLUSH)]: "#fd7e14", // Orange
  [combinationToHumanName(PokerCombination.FULL_HOUSE)]: "#198754", // Dark green
  [combinationToHumanName(PokerCombination.FOUR_OF_A_KIND)]: "#6610f2", // Purple
  [combinationToHumanName(PokerCombination.STRAIGHT_FLUSH)]: "#20c997", // Teal
  [combinationToHumanName(PokerCombination.ROYAL_FLUSH)]: "#e83e8c", // Pink
};

type CombinationsChartProps = {
  data: RunSimulationResponse;
};

const CombinationsChart: React.FC<CombinationsChartProps> = ({
  data,
}) => {
  const transformedData: ({
    name: string;
  } & {
    [K in PokerCombinationName]?: number;
  })[] = useMemo(() => {
    return [
      {
        name: "Wins",
        ...data
          .map((e) => ({
            [combinationToHumanName(e.name)]: e.win + e.lose + e.tie,
          }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      },
    ];
  }, [data]);
  const usedCombinations = useMemo(() => {
    return SORTED_COMBINATIONS.map(combinationToHumanName).filter(
      (c) => transformedData[0][c] !== undefined && transformedData[0][c] > 0,
    );
  }, [transformedData]);

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart layout="vertical" data={transformedData}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        {usedCombinations.map((e) => (
          <Bar key={e} dataKey={e} stackId="b" fill={COLORS[e]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CombinationsChart;
