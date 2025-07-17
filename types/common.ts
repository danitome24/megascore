export type Address = `0x${string}`;

export type Score = {
  total: number;
  rank: number;
  percentile: number;
  level: number;
  nextLevelAt: number;
  daysActive: number;
  weeklyGrowth: number;
};

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

export type Metrics = {
  transactions: number;
  contractsInteracted: number;
  protocolsTested: number;
  activeDays: number;
  totalVolume: string;
  lastActivity: string;
  weeklyGrowth: number;
  monthlyGrowth: number;
};

export type ScoreHistory = {
  date: string;
  score: number;
};

export type AchievedGoal = {
  id: number;
  title: string;
  description: string;
  achievedDate: string;
  icon: any;
  color: string;
  rarity: string;
};
