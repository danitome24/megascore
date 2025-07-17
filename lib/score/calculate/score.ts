import { Address, Metrics, Score } from "@/types/common";

export const calculate = async (metrics: Metrics): Promise<Score> => {
  return {
    total: 2000,
    rank: 1,
    percentile: 95.0,
    level: 5,
    nextLevelAt: 2500,
    daysActive: 30,
    weeklyGrowth: 10.0,
  };
};
