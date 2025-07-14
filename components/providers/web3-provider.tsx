"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, megaethTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [megaethTestnet],
    transports: {
      // RPC URL for each chain
      [megaethTestnet.id]: http(`https://carrot.megaeth.com/rpc`),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
      "3a8170812b534d0ff9d794f19a901d64",

    // Required App Info
    appName: "MegaReputation",

    // Optional App Info
    appDescription: "Track your on-chain reputation and engagement on MegaETH",
    appUrl: "https://mega-reputation.vercel.app/",
    appIcon: "https://mega-reputation.vercel.app/logo.png",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
