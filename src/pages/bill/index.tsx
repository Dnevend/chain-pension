import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { BillCard, BillForm, formSchema } from "./components";
import { useWriteContract, useReadContract, useAccount, useConnect } from "wagmi";
import { COIN_ADDRESS, CONTRACT_ADDRESS } from "@/config";
import { GlobeDemo } from "../landing/components/Globe";
import { Button } from "@/components/ui/button";
import { abi } from "@/config/abi/pension";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleDashed } from "lucide-react";
import { useEffect, useState } from "react";
import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";

const Bill = () => {
  const [open, setOpen] = useState(false);
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "eth",
      frequency: "monthly",
      amount: 1000,
      rate: 0.05,
      retire: 35,
      years: 25,
    },
  });
  
  const { writeContractAsync, isPending } = useWriteContract();

  const { refetch: getBills, data: bills } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS.Pension as `0x${string}`,
    functionName: "batchGetBills",
    args: [0n, 100n]
  })

  const validBills = (bills || [])?.filter((bill: {owner: string}) => bill.owner === address)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if(!isConnected){
      connect({ connector: injected(), chainId: sepolia.id });
      return;
    }

    await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS.Pension as `0x${string}`,
      functionName: "createBill",
      args: [
        // ETH-0
        COIN_ADDRESS.ETH as `0x${string}`,
        BigInt(data.amount),
        BigInt(data.years) * 12n,
        BigInt(data.retire) * 12n,
        BigInt(data.years) * 12n,
      ],
    });
    setOpen(false);
    getBills();
  };

  useEffect(() => {
    getBills();
  }, [address, isConnected, getBills]);

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-start justify-around gap-12 py-12 w-full">
      <div className="flex flex-wrap justify-center gap-4 mx-auto">
        {validBills?.map((bill) => (
          <BillCard key={bill.startTime} bill={bill} />
        ))}
      </div>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogTrigger className="mx-auto">
          <Button>创建保单</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建保单</DialogTitle>
          </DialogHeader>
          
          <BillForm form={form} onSubmit={onSubmit} />

          <DialogFooter>
            <Button 
                type="submit" 
                className="px-4" 
                onClick={() => {
                  form.handleSubmit(onSubmit)()
                }}
                disabled={isPending}
              >
                {isPending ? <CircleDashed className="animate-spin" /> : '创建'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <GlobeDemo />
    </div>
  );
};

export default Bill;
