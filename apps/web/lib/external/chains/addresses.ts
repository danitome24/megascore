import megaethTestnetAddresses from "@/addresses/megaeth-testnet.json";
import { Address } from "@/lib/domain/shared/types";
import { getChain } from "@/lib/external/chains/client";
import { hardhat, megaethTestnet } from "viem/chains";

const isDevelopment = process.env.NODE_ENV === "development";

// Lazy load localhost addresses only in development
let localhostAddresses: Record<string, Address> | null = null;

async function getLocalhostAddresses(): Promise<Record<string, Address>> {
  if (!localhostAddresses && isDevelopment) {
    try {
      localhostAddresses = (await import("@/addresses/localhost.json")).default;
    } catch (error) {
      console.warn("localhost.json not found in development");
      localhostAddresses = {};
    }
  }
  return localhostAddresses || {};
}

export async function getAddressesForChain(): Promise<Record<"MegaScore" | "TestToken", Address>> {
  const chainId = getChain().id;

  if (chainId === hardhat.id && isDevelopment) {
    return getLocalhostAddresses();
  } else if (chainId === megaethTestnet.id) {
    return megaethTestnetAddresses as Record<string, Address>;
  }

  throw new Error(`No addresses configured for chainId: ${chainId}`);
}
