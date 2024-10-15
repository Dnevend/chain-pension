import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const formSchema = z.object({
  token: z.enum(["usdt", "btc", "eth"]),
  frequency: z.enum(["monthly", "yearly"]),
  investYears: z.coerce.number().min(1, {
    message: "Invest years must be at least 1.",
  }),
  rate: z.coerce.number().min(0.01, {
    message: "Rate must be at least 0.01.",
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

export const BillForm = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                  <Input type="number" placeholder="输入投保年限" {...field} />
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
                  <Input type="number" placeholder="输入投保金额" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <FormField
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
                  <Input type="number" placeholder="输入年利率" {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}

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
                  <Input type="number" placeholder="输入退休时间" {...field} />
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
                <FormLabel>领取年份</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="输入领取年份" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
