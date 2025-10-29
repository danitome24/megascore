import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { hardhat, megaethTestnet } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [hardhat, megaethTestnet],
    transports: {
      [hardhat.id]: http(`http://localhost:8545`),
      [megaethTestnet.id]: http(`https://carrot.megaeth.com/rpc`),
    },

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
