import { Address, Metrics } from "@/types/common";

export const metrics = async (wallet: Address): Promise<Metrics> => {
  return {
    transactions: 43,
    weeksActive: 2,
    uniqueContractsInteractedWith: 5,
    txTypesUsed: 3,
    hasDeployedContract: true,
    contractsDeployedCount: 2,
    nftMintedCount: 4,
    maxConsecutiveActiveWeeks: 1,
    weeksSinceFirstTransaction: 10,
    lastActiveDate: new Date("2024-12-01"),
  };
};
