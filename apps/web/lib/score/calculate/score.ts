import { MetricsData } from "@/lib/domain/metrics/types";
import { Score } from "@/lib/domain/score/types";

export const calculate = async (metrics: MetricsData): Promise<number> => {
  // Weighted score using all metrics fields
  const base = 1000;
  const txScore = metrics.transactions * 8;
  const weeksActiveScore = metrics.weeksActive * 20;
  const uniqueContractsScore = metrics.uniqueContractsInteractedWith * 15;
  const txTypesScore = metrics.txTypesUsed * 30;
  const contractDeployScore = metrics.contractsDeployedCount * 120;
  const nftScore = metrics.nftMintedCount * 60;
  const maxConsecWeeksScore = metrics.maxConsecutiveActiveWeeks * 25;
  const weeksSinceFirstScore = metrics.weeksSinceFirstTransaction * 10;
  // Bonus for contract deployment
  const contractBonus = metrics.hasDeployedContract ? 200 : 0;
  // Recent activity bonus (last 4 weeks)
  const now = new Date();
  const weeksSinceActive = Math.floor((now.getTime() - metrics.lastActiveDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const recentActivityBonus = weeksSinceActive <= 4 ? 150 : 0;

  const total =
    base +
    txScore +
    weeksActiveScore +
    uniqueContractsScore +
    txTypesScore +
    contractDeployScore +
    nftScore +
    maxConsecWeeksScore +
    weeksSinceFirstScore +
    contractBonus +
    recentActivityBonus;

  return total;
};
