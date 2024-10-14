import { useState } from "react";
import { Calculator, formSchema, PlanChart } from "./components";
import { z } from "zod";
import { useCalc } from "@/hooks/useCalc";

const Bill = () => {
  const [params, setParams] = useState<z.infer<typeof formSchema>>({
    token: "usdt",
    frequency: "monthly",
    rate: 0.01,
    amount: 100,
    retire: 35,
    years: 25,
  });

  const onCalc = (data: z.infer<typeof formSchema>) => {
    setParams(data);
  };

  const data = useCalc({
    investMonthAmount: params.amount,
    investYears: 10,
    yearRate: params.rate,
    retireYears: params.retire,
    receiptYears: params.years,
  });

  return (
    <div className="max-w-screen-md mx-auto flex flex-col sm:flex-row items-start justify-around gap-12 py-12 w-full">
      <Calculator onCalc={onCalc} />
      <PlanChart data={data} />
    </div>
  );
};

export default Bill;
