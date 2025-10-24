import { Metrics } from "@/types/common";
import type {
  TransactionApiResponse,
  TransactionItem,
} from "@/lib/sources/transactions";

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export const mapTxsToMetrics = (api: TransactionApiResponse): Metrics => {
  const txs = api.items || [];
  const uniqueContracts = new Set<string>();
  let nftMintedCount = 0;
  let contractsDeployedCount = 0;
  let lastActiveDate: Date | undefined = undefined;
  let firstTxDate: Date | undefined = undefined;
  let totalValue = 0;

  for (const tx of txs as TransactionItem[]) {
    // Unique contracts interacted with
    if (tx.to?.hash) uniqueContracts.add(tx.to.hash);

    // Total value transferred
    if (tx.value) {
      try {
        totalValue += Number(tx.value);
      } catch {}
    }

    // NFT minted: check transaction_types for 'nft_mint' or similar
    if (
      Array.isArray(tx.transaction_types) &&
      tx.transaction_types.includes("nft_mint")
    ) {
      nftMintedCount++;
    }

    // Contract deployed: check created_contract field
    if (tx.created_contract) {
      contractsDeployedCount++;
    }

    // Track last/first activity
    if (tx.timestamp) {
      const date = new Date(tx.timestamp);
      if (!lastActiveDate || date > lastActiveDate) lastActiveDate = date;
      if (!firstTxDate || date < firstTxDate) firstTxDate = date;
    }
  }

  // Calculate weeks active
  let weeksActive = 0;
  if (firstTxDate && lastActiveDate) {
    weeksActive = Math.max(
      1,
      Math.round(
        (lastActiveDate.getTime() - firstTxDate.getTime()) / MS_PER_WEEK
      )
    );
  }

  // Placeholder logic for other fields
  const maxConsecutiveActiveWeeks = weeksActive;
  const txTypesUsed = new Set(
    (txs as any[]).flatMap((tx) =>
      Array.isArray(tx.transaction_types) ? tx.transaction_types : []
    )
  ).size;

  return {
    transactions: txs.length,
    weeksActive,
    uniqueContractsInteractedWith: uniqueContracts.size,
    txTypesUsed,
    hasDeployedContract: contractsDeployedCount > 0,
    contractsDeployedCount,
    nftMintedCount,
    maxConsecutiveActiveWeeks,
    weeksSinceFirstTransaction: weeksActive,
    lastActiveDate: lastActiveDate || new Date(),
    // Optionally: add totalVolume: totalValue.toString() if your Metrics type supports it
  };
};
