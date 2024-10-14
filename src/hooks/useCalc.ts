import { useMemo } from "react";

type Props = {
    // 每期金额
    investMonthAmount: number,
    // 投保年数
    investYears: number,
    // 年利率
    yearRate: number,
    // 多少年后退休
    retireYears: number,
    // 领多少年
    receiptYears: number,
}

export type CalcData = Props & {
    /** 投入总额 */
    investAmount: number,
    /** 退休时养老金账户价值 */
    retireAmount: number,
    /** 领取总额 */
    receiptAmount: number
    /** 每月领取金额 */
    retireMonthAmount: number
    /** 比率 */
    ratio: number
}


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

export const useCalc = (props: Props): CalcData => {

    const { investMonthAmount, investYears, yearRate, retireYears, receiptYears } = props;

    const data = useMemo(() => {
        try {
            let retireAmount = 0;
            const monthRate = yearRate / 12;
            for (let i = 0; i < investYears; i++) {
                for (let j = 0; j < 12; j++) {
                    retireAmount += investMonthAmount * (1 + monthRate * (12 - j));
                }
            }

            for (let i = 0; i < retireYears - investYears; i++) {
                retireAmount *= 1 + yearRate;
            }

            const investAmount = investMonthAmount * investYears * 12;
            console.log(`退休时养老金账户价值: ${retireAmount} 元, 投入总额: ${investAmount} 元，比率: ${retireAmount / investAmount} %`);
            const retireMonthAmount = calculateMonthlyPayment(retireAmount, yearRate, receiptYears);
            const receiptAmount = retireMonthAmount * receiptYears * 12;
            console.log(`领取 ${receiptYears} 年，每月养老金: ${retireMonthAmount} 元, 领取总额: ${receiptAmount}, 比率: ${receiptAmount / investAmount} %`);

            return {
                investAmount,
                retireAmount,
                receiptAmount,
                retireMonthAmount,
                ratio: receiptAmount / investAmount
            }

        } catch (e) {
            console.error(e);
        }

        return { investAmount: 0, retireAmount: 0, receiptAmount: 0, retireMonthAmount: 0, ratio: 0 }
    }, [investMonthAmount, investYears, yearRate, retireYears, receiptYears]);

    return { ...props, ...data }
};
