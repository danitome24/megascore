import { Chain, createPublicClient, http } from "viem";
import { hardhat, megaethTestnet } from "viem/chains";

const isDevelopment = process.env.NODE_ENV === "development";

export function getChain(): Chain {
  return isDevelopment ? hardhat : megaethTestnet;
}

/**
 * Get the RPC URL based on environment and chain
 */
function getRpcUrl(): string {
  if (isDevelopment) {
    return "http://localhost:8545";
  }
  return "https://carrot.megaeth.com/rpc";
}

/**
 * Create and return a Viem public client for reading blockchain data
 * Uses environment variables for RPC URL and chain configuration
 */
export function getPublicClient() {
  return createPublicClient({
    chain: getChain(),
    transport: http(getRpcUrl()),
  });
}
