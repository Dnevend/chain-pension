import { useState } from "react";

export const useCalc = () => {
    const [age, setAge] = useState(0);
    const [salary, setSalary] = useState(0);

    const rate = 0.08;

    /**
     * 计算每月支付金额
     * @param P 本金
     * @param annualRate 年利率
     * @param years 年数
     * @returns 每月支付金额
     */
    function calculateMonthlyPayment(P: number, annualRate: number, years: number): number {
        const monthlyRate: number = annualRate / 12;
        const totalMonths: number = years * 12;
        return (P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }


    return {
        age,
        salary,
        rate,
        setAge,
        setSalary,
        calculateMonthlyPayment,
    };
};
