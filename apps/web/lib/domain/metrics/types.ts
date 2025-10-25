export type MetricsData = {
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

export interface Metrics {
  id: string;
  accountId: string;
  data: MetricsData;
  updatedAt: string;
}

export interface MetricsHistory {
  id: string;
  accountId: string;
  data: MetricsData;
  recordedAt: string;
}
