export type Address = `0x${string}`;

// Ranks
export type Rank = {
  rank: number;
  level: number;
  percentile: number;
  nextLevelAt: number;
};
