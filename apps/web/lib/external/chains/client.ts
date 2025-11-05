import { Chain, createPublicClient, http } from "viem";
import { hardhat, megaethTestnet } from "viem/chains";

const isDevelopment = process.env.NODE_ENV === "development";

export function getChain(): Chain {
  return isDevelopment ? hardhat : megaethTestnet;
}

/**
 * Create and return a Viem public client for reading blockchain data
 * Uses environment variables for RPC URL and chain configuration
 */
export function getPublicClient() {
  return createPublicClient({
    chain: getChain(),
    transport: http("http://localhost:8545"),
  });
}
