import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { title: "累计投入", amount: 12000 },
  { title: "至85岁可领取", amount: 32500 },
];

const chartConfig = {
  amount: {
    label: "金额",
  },
} satisfies ChartConfig;

export function AmountChart() {
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
        Total up 5.2% <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}
