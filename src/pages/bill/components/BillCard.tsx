import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import dayjs from "dayjs";

export type Bill = {
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

export const BillCard = ({
  bill,
  onClick,
}: {
  bill: Bill;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className="bg-gradient-to-r from-slate-900 to-slate-700 text-slate-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    <CardHeader>
      <CardTitle className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        <img
          src="https://cryptologos.cc/logos/ethereum-eth-logo.svg"
          className="w-4 h-4 mr-2"
        />
        ETH Pension Bill
      </CardTitle>
      <CardDescription>{bill.owner}</CardDescription>
    </CardHeader>

    <CardContent>
      <div>{bill.closed}</div>
      <p>
        Pay Month: {String(bill.payedMonths)} / {String(bill.payMonths)}
      </p>
      <div className="flex items-center justify-between">
        <span>
          $<span className="text-xl font-bold">{Number(bill.payAmount)}</span> /
          Month
        </span>

        <span>
          {dayjs(Number(String(bill.startTime + `000`))).format("YYYY-MM-DD")}
        </span>
      </div>
    </CardContent>
  </Card>
);
