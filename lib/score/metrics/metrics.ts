import { Address, Metrics } from "@/types/common";

export const metrics = async (wallet: Address): Promise<Metrics> => {
  return {
    transactions: 150,
    contractsInteracted: 10,
    protocolsTested: 5,
    activeDays: 30,
    totalVolume: "1000 ETH",
    lastActivity: "2023-10-01T12:00:00Z",
    weeklyGrowth: 5.0,
    monthlyGrowth: 20.0,
  };
};
