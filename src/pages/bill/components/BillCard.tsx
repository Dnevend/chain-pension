import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { useState } from "react";
import { CircleDashed } from "lucide-react";
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/config";
import { abi } from "@/config/abi/pension";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FundTable from "./FundTable";
import store from "store2";
import { toast } from "react-hot-toast";

export type Bill = {
  id: number;
  owner: string;
  // 是否关闭
  closed: boolean;
  // 每月支付金额
  payAmount: bigint;
  // 需要支付的月份
  payMonths: bigint;
  // 支付的token
  payToken: string;
  // 已支付月份
  payedMonths: bigint;
  // 可领取的月份
  receiveMonths: bigint;
  // 领取需要等待的月份
  receiveStartMonth: bigint;
  // 已领取多少月
  receivedMonths: bigint;
  // 保单创建日期
  startTime: bigint;
};

export const BillCard = ({ bill, onRefresh }: { bill: Bill, onRefresh: () => void }) => {
  const [fundSelecting, setFundSelecting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [closing, setClosing] = useState(false);
  const { data: nextPayTime } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS.Pension as `0x${string}`,
    functionName: "getNextPayTime",
    args: [BigInt(bill.id)]
  })
  const { writeContractAsync } = useWriteContract();
  const [billFunds, setBillFunds] = useState<{id: number, fund: string, rate: string}[]>(store.get("bill-fund", []));
  const currentFund = billFunds.find(item => item.id === bill.id);

  const payable = nextPayTime && dayjs().isAfter(dayjs(Number(String(nextPayTime + `000`))));

  const onPay = async () => {
    try{
      if(!payable) {
        toast.error("未到缴费时间!");
        return;
      }
      
      console.log('onPay', bill.id)
      setPaying(true);
      await writeContractAsync({
        address: CONTRACT_ADDRESS.Pension as `0x${string}`,
        abi: abi,
        functionName: "payBill",
        args: [BigInt(bill.id)],
        value: bill.payAmount,
      });
      toast.success("缴费成功!");
      onRefresh();
    } finally {
      setPaying(false);
    }
  };

  const onClose = async () => {
    try{
      console.log('onClose', bill.id)
      setClosing(true);
      await writeContractAsync({
        address: CONTRACT_ADDRESS.Pension as `0x${string}`,
        abi: abi,
        functionName: "closeBill",
        args: [BigInt(bill.id)],
      });
      toast.success("关闭成功!");
      onRefresh();
    } finally {
      setClosing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          <img
            src="https://cryptologos.cc/logos/ethereum-eth-logo.svg"
            className="w-4 h-4 mr-2"
          />
          ETH Pension Bill
        </CardTitle>
        <CardDescription className="line-clamp-1">受益人: {bill.owner}</CardDescription>
      </CardHeader>

      <CardContent>
        <div>{bill.closed}</div>
        <p>
          Pay Month: {String(bill.payedMonths)} / {String(bill.payMonths)}
        </p>
        <div className="flex items-center justify-between">
          <span>
            $<span className="text-xl font-bold">{Number(bill.payAmount)}</span>{" "}
            / Month
          </span>

          <span>
            {dayjs(Number(String(bill.startTime + `000`))).format("YYYY-MM-DD")}
          </span>
        </div>
      </CardContent>

      <div className="h-[1px] w-full bg-slate-500 opacity-50 my-2" />

      {!bill.closed ? (
        <CardFooter className="flex justify-around">
          <div role="button" className="bg-none hover:font-bold" onClick={onPay}>
          
            {payable ? (
              <>
                {paying ? <CircleDashed className="animate-spin" /> : "缴费"}
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p>{dayjs(Number(String(nextPayTime + `000`))).format("YYYY-MM-DD")}</p>
                <p className="text-xs">下次缴费</p>
              </div>
            )}
          </div>

          <div className="w-[1px] h-4 bg-slate-500 opacity-50" />

          <div 
            role="button"
            className="bg-none hover:font-bold"
            onClick={() => {
              setFundSelecting(true);
            }}
          >
            {currentFund ? `${currentFund.fund}(${currentFund.rate})` : "选择基金"}
          </div>

          <div className="w-[1px] h-4 bg-slate-500 opacity-50" />

          <div
            role="button"
            className="bg-none text-red-200 hover:font-bold"
            onClick={onClose}
          >
            {closing ? <CircleDashed className="animate-spin" /> : "关闭"}
          </div>
        </CardFooter>
      ): (
        <CardFooter className="flex justify-around">
          <p className="text-red-600 font-bold">保单已关闭</p>
        </CardFooter>
      )}

      <Dialog open={fundSelecting} onOpenChange={(v) => setFundSelecting(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>选择基金</DialogTitle>
          </DialogHeader>
          <FundTable 
            id={bill.id}
            refresh={() => {
              toast.success("Success!");
              setBillFunds(store.get("bill-fund", []));
              setFundSelecting(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};
