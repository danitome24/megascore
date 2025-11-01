import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";

/**
 * Create and return a Viem public client for reading blockchain data
 * Uses environment variables for RPC URL and chain configuration
 */
export function getPublicClient() {
  return createPublicClient({
    chain: hardhat,
    transport: http("http://localhost:8545"),
  });
}
