export interface Metrics {
  id: string;
  accountId: string;
  data: OnChainActivity;
  updatedAt: string;
}

export interface MetricsHistory {
  id: string;
  accountId: string;
  data: OnChainActivity;
  recordedAt: string;
}

export type OnChainActivity = {
  transactions: number;
  weeksActive: number;
  uniqueContractsInteractedWith: number;
  txTypesUsed: number;
  hasDeployedContract: boolean;
  contractsDeployedCount: number;
  nftMintedCount: number;
  maxConsecutiveActiveWeeks: number;
  weeksSinceFirstTransaction: number;
  lastActiveDate: string;
};
