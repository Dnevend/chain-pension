import { Calculator, PlanChart } from "./components";

const Bill = () => {
  return (
    <div className="max-w-screen-md mx-auto flex flex-col sm:flex-row items-start justify-around gap-12 py-12 w-full">
      <Calculator />
      <PlanChart />
    </div>
  );
};

export default Bill;
