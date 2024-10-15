import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { Line, LineChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import store2 from "store2";
import { toast } from "react-hot-toast";

const chartConfig = {
  rate: {
    label: "Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const items = [
  {
    name: "AAVE",
    rate: `4%`,
    historyRate: [0.05, 0.07, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.04],
  },
  {
    name: "Lido",
    rate: `5%`,
    historyRate: [0.05, 0.03, 0.05, 0.05, 0.05, 0.06, 0.05, 0.07, 0.05, 0.05],
  },
  {
    name: "MarkDAO",
    rate: `6%`,
    historyRate: [0.05, 0.05, 0.06, 0.05, 0.04, 0.08, 0.05, 0.05, 0.05, 0.06],
  },
];

export default function FundTable({id, refresh}: {id: number, refresh: () => void}) {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  const handleSelectRow = (index: number) => {
    console.log(index);
    setSelectedRow(index);
  };

  const handleConfirm = (id: number) => {
    if(selectedRow === null) {
      toast.error("请选择一个基金");
      return;
    }

    const record = store2.get("bill-fund", []).filter((item:{id: number}) => item.id !== id);
    store2.set("bill-fund", [...record, {
      id,
      fund: items[selectedRow!].name,
      rate: items[selectedRow!].rate,
    }]);

    refresh();
  };

  return (
    <Table className="min-w-full">
      <TableCaption><Button onClick={() => handleConfirm(id)}>确定选择</Button></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>选择</TableHead>
          <TableHead>名称</TableHead>
          <TableHead>年利率</TableHead>
          <TableHead className="flex items-center">
            历史利率曲线
            <TrendingUp className="w-4 h-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <input
                className="cursor-pointer"
                type="radio"
                name="table-select"
                checked={selectedRow === index}
                onChange={() => handleSelectRow(index)}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.rate}</TableCell>

            <TableCell>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={item.historyRate.map((it, index) => ({
                    day: index,
                    rate: it * 100,
                  }))}
                >
                  <Line
                    dataKey="rate"
                    type="natural"
                    stroke="var(--color-rate)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
