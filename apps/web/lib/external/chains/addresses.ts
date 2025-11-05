import megaethTestnetAddresses from "@/addresses/megaeth-testnet.json";
import { Address } from "@/lib/domain/shared/types";
import { getChain } from "@/lib/external/chains/client";
import { hardhat, megaethTestnet } from "viem/chains";

const isDevelopment = process.env.NODE_ENV === "development";

// Only import localhost addresses in development
let localhostAddresses: Record<"MegaScore" | "TestToken", Address> | undefined;
if (isDevelopment) {
  try {
    // Use require for conditional loading at build time
    localhostAddresses = require("@/addresses/localhost.json");
  } catch (e) {
    console.warn("localhost.json not found in development");
  }
}

/**
 * Get contract addresses for the current chain
 * Uses localhost.json in development, megaeth-testnet.json in production
 */
export function getAddressesForChain(): Record<"MegaScore" | "TestToken", Address> {
  const chainId = getChain().id;

  if (chainId === hardhat.id && isDevelopment && localhostAddresses) {
    return localhostAddresses as Record<"MegaScore" | "TestToken", Address>;
  } else if (chainId === megaethTestnet.id) {
    return megaethTestnetAddresses as Record<"MegaScore" | "TestToken", Address>;
  }

  throw new Error(`No addresses configured for chainId: ${chainId}`);
}
