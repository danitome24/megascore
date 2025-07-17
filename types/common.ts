export type Address = `0x${string}`;

// Score
export type Score = {
  total: number;
};

export type ScoreHistory = {
  date: string;
  score: number;
};

// Metrics
export type Metrics = {
  transactions: number;
  weeksActive: number;
  uniqueContractsInteractedWith: number;
  txTypesUsed: number;
  hasDeployedContract: boolean;
  contractsDeployedCount: number;
  nftMintedCount: number;
  maxConsecutiveActiveWeeks: number;
  weeksSinceFirstTransaction: number;
  lastActiveDate: Date;
};

// NFT
export type NFTData = {
  tokenId: string;
  score: number;
  level: number;
  mintDate: string;
  lastUpdate: string;
  attributes: Array<{
    trait: string;
    value: string;
    rarity: string;
  }>;
};

// Achieved Goals
export type AchievedGoal = {
  id: number;
  title: string;
  description: string;
  achievedDate: string;
  icon: any;
  color: string;
  rarity: string;
};

// Ranks
export type Rank = {
  rank: number;
  level: number;
  percentile: number;
  nextLevelAt: number;
};
