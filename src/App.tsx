import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { RouterProvider } from "react-router-dom";
import { chainConfig, router } from "./config";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={chainConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Toaster />
          <RouterProvider router={router} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
