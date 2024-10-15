import { useState } from "react";
import { Calculator, formSchema, PlanChart } from "./components";
import { z } from "zod";
import { useCalc } from "@/hooks/useCalc";

const Bill = () => {
  const [params, setParams] = useState<z.infer<typeof formSchema>>({
    token: "usdt",
    frequency: "monthly",
    investYears: 10,
    rate: 0.05,
    amount: 1000,
    retire: 35,
    years: 25,
  });

  const onCalc = (data: z.infer<typeof formSchema>) => {
    setParams(data);
  };

  const data = useCalc({
    investMonthAmount: params.amount,
    investYears: params.investYears,
    yearRate: params.rate,
    retireYears: params.retire,
    receiptYears: params.years,
  });

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-start justify-around gap-12 py-12">
      <Calculator onCalc={onCalc} />
      <PlanChart data={data} />
    </div>
  );
};

export default Bill;
