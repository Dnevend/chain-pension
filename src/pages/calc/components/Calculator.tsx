import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Calculator as CalculatorIcon } from "lucide-react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  token: z.enum(["usdt", "btc", "eth"]),
  frequency: z.enum(["monthly", "yearly"]),
  rate: z.number().min(0.01, {
    message: "Rate must be at least 0.01.",
  }),
  amount: z.number().min(100, {
    message: "Amount must be at least 100.",
  }),
  years: z.number().min(1, {
    message: "Years must be at least 1.",
  }),
});

export const Calculator = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "usdt",
      frequency: "monthly",
      rate: 0.08,
      amount: 1000,
      years: 10,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon />
          制定方案
        </CardTitle>
        <CardDescription>输入你的预期参数，计算你的养老金。</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>投保标的</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="usdt"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择投保标的" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usdt">USDT</SelectItem>
                          <SelectItem value="btc">BTC</SelectItem>
                          <SelectItem value="eth">ETH</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>投保频率</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="monthly"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择投保方案" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">每月投</SelectItem>
                          <SelectItem value="yearly" disabled>
                            每年投
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>投保金额</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入投保金额"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年利率</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入年利率"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>退休时间</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入退休时间"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>领取年份</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入领取年份"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" className="px-8">
                计算
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
