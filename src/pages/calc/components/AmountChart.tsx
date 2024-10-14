import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  amount: {
    label: "金额",
  },
} satisfies ChartConfig;

export function AmountChart({
  input,
  output,
  total,
  ratio,
}: {
  input: number;
  output: number;
  total: number;
  ratio: number;
}) {
  const chartData = [
    { title: "累计投入", amount: input.toFixed(2) },
    { title: "退休时可领取", amount: output.toFixed(2) },
    { title: "累计可领取", amount: total.toFixed(2) },
  ];

  return (
    <div className="flex flex-col gap-2">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="title"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis orientation="right" />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />

          <Bar dataKey="amount" radius={4} label={{ position: "top" }}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--chart-${index + 1}))`}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="flex gap-2 font-medium leading-none">
        Total up {ratio.toFixed(2)}% <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}
