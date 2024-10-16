import { sepolia } from 'wagmi/chains'
import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "connectkit";

export const chainConfig = createConfig(
    getDefaultConfig({
        chains: [sepolia],

        transports: {
            // [mainnet.id]: http(),
            [sepolia.id]: http(),
        },

        // Required API Keys
        walletConnectProjectId: "30e767d5912dfeb521965a3b57169f4f",

        // Required App Info
        appName: "ChainPension",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);
