import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AmountChart } from "./AmountChart";
import { useState } from "react";
import CountUp from "react-countup";
import type { CalcData } from "@/hooks/useCalc";
import emptyImage from "@/assets/digital-nomad.svg";

type CardTab = "amount" | "detail";

export const PlanChart = ({ data }: { data: CalcData }) => {
  const [currentTab, setCurrentTab] = useState<CardTab>("amount");

  return (
    <div className="w-full flex flex-col gap-2">
      <Tabs
        defaultValue="amount"
        className="w-full"
        onValueChange={(v) => setCurrentTab(v as CardTab)}
      >
        <TabsList className="w-full">
          <TabsTrigger value="amount" className="w-full">
            投领金额
          </TabsTrigger>
          <TabsTrigger value="detail" className="w-full">
            领取详情
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-1 p-4">
            <p className="text-gray-500">退休时累计可领</p>

            <CountUp
              end={data.receiptAmount}
              duration={1}
              prefix="$"
              className="text-2xl font-bold"
            />

            <p className="text-gray-300">
              每月可领取${data.retireMonthAmount.toFixed(2)}
            </p>
          </div>

          <div className="w-[1px] h-16 bg-gray-300"></div>

          <div className="flex flex-col items-end p-4">
            <p className="text-gray-500">领取倍数</p>

            <p className="text-2xl font-bold text-orange-500">
              {data.ratio.toFixed(2)}
              <span className="text-sm">倍</span>
            </p>
          </div>
        </div>

        {currentTab === "amount" && (
          <CardContent>
            <AmountChart
              input={data.investAmount}
              output={data.retireAmount}
              total={data.receiptAmount}
              ratio={data.ratio}
            />
          </CardContent>
        )}

        {currentTab === "detail" && (
          <CardContent className="flex items-center justify-center">
            <img src={emptyImage} className="w-4/5 h-full" />
          </CardContent>
        )}
      </Card>
    </div>
  );
};
