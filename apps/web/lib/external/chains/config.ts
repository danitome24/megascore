import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { hardhat, megaethTestnet } from "wagmi/chains";

const isDevelopment = process.env.NODE_ENV === "development";

// Configure chains based on environment
const devChains = [hardhat, megaethTestnet] as const;
const prodChains = [megaethTestnet] as const;
const chains = isDevelopment ? devChains : prodChains;

// Configure transports based on environment
const devTransports = {
  [hardhat.id]: http("http://localhost:8545"),
  [megaethTestnet.id]: http("https://carrot.megaeth.com/rpc"),
} as const;

const prodTransports = {
  [megaethTestnet.id]: http("https://carrot.megaeth.com/rpc"),
} as const;

const transports = isDevelopment ? devTransports : prodTransports;

export const config = createConfig(
  getDefaultConfig({
    chains: chains as typeof devChains,
    transports: transports as typeof devTransports,

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

    // Required App Info
    appName: "MegaReputation",

    // Optional App Info
    appDescription: "Track your on-chain reputation and engagement on MegaETH",
    appUrl: "https://mega-reputation.vercel.app/",
    appIcon: "https://mega-reputation.vercel.app/logo.png",
  }),
);
