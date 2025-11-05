import localhostAddresses from "@/addresses/localhost.json";
import megaethTestnetAddresses from "@/addresses/megaeth-testnet.json";
import { Address } from "@/lib/domain/shared/types";
import { getChain } from "@/lib/external/chains/client";
import { hardhat, megaethTestnet } from "viem/chains";

const chainIdToAddresses: Record<number, Record<"MegaScore" | "TestToken", Address>> = {
  [hardhat.id]: localhostAddresses as Record<string, Address>,
  [megaethTestnet.id]: megaethTestnetAddresses as Record<string, Address>,
};

export function getAddressesForChain(): Record<"MegaScore" | "TestToken", Address> {
  const chainId = getChain().id;
  const addresses = chainIdToAddresses[chainId];
  if (!addresses) {
    console.error(`No addresses configured for chainId: ${chainId}`);
    throw new Error(`No addresses configured for chainId: ${chainId}`);
  }
  return addresses;
}
