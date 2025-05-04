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
import { SORTED_COMBINATIONS } from "../utils/utils";

const COLORS: Record<string, string> = {
  [PokerCombination.HIGH_CARD]: "#6c757d", // Gray
  [PokerCombination.PAIR]: "#dc3545", // Crimson red
  [PokerCombination.TWO_PAIRS]: "#adb5bd", // Lighter gray
  [PokerCombination.THREE_OF_A_KIND]: "#0d6efd", // Blue
  [PokerCombination.STRAIGHT]: "#ffc107", // Yellow
  [PokerCombination.FLUSH]: "#fd7e14", // Orange
  [PokerCombination.FULL_HOUSE]: "#198754", // Dark green
  [PokerCombination.FOUR_OF_A_KIND]: "#6610f2", // Purple
  [PokerCombination.STRAIGHT_FLUSH]: "#20c997", // Teal
  [PokerCombination.ROYAL_FLUSH]: "#e83e8c", // Pink
};

type CombinationsChartProps = {
  data: RunSimulationResponse;
};

const CombinationsChart: React.FC<CombinationsChartProps> = ({ data }) => {
  const { t } = useTranslation();

  const transformedData: ({
    name: string;
  } & {
    [K in PokerCombination]?: number;
  })[] = useMemo(() => {
    return [
      {
        name: t("common.number"),
        ...data
          .map((e) => ({
            [e.name]: e.win + e.lose + e.tie,
          }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      },
    ];
  }, [data, t]);
  const usedCombinations = useMemo(() => {
    return SORTED_COMBINATIONS.filter(
      (c) => transformedData[0][c] !== undefined && transformedData[0][c] > 0,
    );
  }, [transformedData]);
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
          formatter={(value, name) => [
            `${value} (${(((value as number) / total) * 100).toFixed(2)}%)`,
            t("poker.combination." + name),
          ]}
        />
        <Legend formatter={(value) => t("poker.combination." + value)} />
        {usedCombinations.map((e) => (
          <Bar key={e} dataKey={e} stackId="b" fill={COLORS[e]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CombinationsChart;
