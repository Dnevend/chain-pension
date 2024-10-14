import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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

export const BillCard = ({ bill }: { bill: Bill }) => (
  <Card className="cursor-pointer hover:shadow-md transition-all duration-300">
    <CardHeader>
      <CardTitle>ETH Pension Bill</CardTitle>
      <CardDescription>{bill.owner}</CardDescription>
    </CardHeader>

    <CardContent>
      <p>
        Month {String(bill.payedMonths)} / {String(bill.payMonths)}
      </p>
    </CardContent>
  </Card>
);
