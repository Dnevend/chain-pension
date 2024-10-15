import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm, ControllerRenderProps } from "react-hook-form";
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

export const formSchema = z.object({
  token: z.enum(["usdt", "btc", "eth"]),
  frequency: z.enum(["monthly", "yearly"]),
  rate: z.coerce.number().min(0.01, {
    message: "Rate must be at least 0.01.",
  }),
  investYears: z.coerce.number().min(1, {
    message: "Invest years must be at least 1.",
  }),
  amount: z.coerce.number().min(100, {
    message: "Amount must be at least 100.",
  }),
  retire: z.coerce.number().min(1, {
    message: "Retire must be at least 1.",
  }),
  years: z.coerce.number().min(1, {
    message: "Years must be at least 1.",
  }),
});

export const Calculator = ({
  onCalc,
}: {
  onCalc: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "usdt",
      frequency: "monthly",
      investYears: 10,
      rate: 0.05,
      amount: 1000,
      retire: 35,
      years: 25,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onCalc(data);
  };

  return (
    <Card className="w-full">
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
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>投保标的</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        {...field}
                        value={field.value as string}
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
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>投保频率</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        {...field}
                        value={field.value as string}
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
                name="investYears"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>投保年限</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入投保年限"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
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
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>年利率</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入年利率"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="retire"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>多少年后退休</FormLabel>
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
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<z.infer<typeof formSchema>>;
                }) => (
                  <FormItem>
                    <FormLabel>领取年数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="输入领取年数"
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
