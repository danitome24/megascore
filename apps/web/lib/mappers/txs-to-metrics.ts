import { OnChainActivity } from "../domain/metrics/types";
import type { TransactionApiResponse, TransactionItem } from "@/lib/external/sources/transactions";

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Maps raw blockchain transaction data to OnChainActivity metrics
 *
 * Calculates:
 * - transactions: total transaction count
 * - weeksActive: number of unique weeks with activity
 * - uniqueContractsInteractedWith: count of unique contract addresses
 * - txTypesUsed: count of different transaction types
 * - hasDeployedContract: whether user deployed any contracts
 * - contractsDeployedCount: total contracts deployed
 * - nftMintedCount: total NFTs minted
 * - maxConsecutiveActiveWeeks: longest consecutive week streak
 * - weeksSinceFirstTransaction: total weeks from first to last tx
 * - lastActiveDate: timestamp of most recent transaction
 */
export const mapTxsToMetrics = (api: TransactionApiResponse): OnChainActivity => {
  const txs = api.items || [];

  if (txs.length === 0) {
    return {
      transactions: 0,
      weeksActive: 0,
      uniqueContractsInteractedWith: 0,
      txTypesUsed: 0,
      hasDeployedContract: false,
      contractsDeployedCount: 0,
      nftMintedCount: 0,
      maxConsecutiveActiveWeeks: 0,
      weeksSinceFirstTransaction: 0,
      lastActiveDate: new Date().toISOString(),
    };
  }

  const uniqueContracts = new Set<string>();
  const transactionTypeSet = new Set<string>();
  const activeWeeks = new Set<number>(); // Track week numbers for unique week calculation
  const dayActivityMap = new Map<string, boolean>(); // Track active days for consecutive weeks

  let nftMintedCount = 0;
  let contractsDeployedCount = 0;
  let lastActiveDate: Date | null = null;
  let firstTxDate: Date | null = null;

  // Process each transaction
  for (const tx of txs as TransactionItem[]) {
    // Count unique contracts interacted with
    if (tx.to?.hash) {
      uniqueContracts.add(tx.to.hash);
    }

    // Count transaction types used
    if (Array.isArray(tx.transaction_types)) {
      tx.transaction_types.forEach(type => transactionTypeSet.add(type));
    }

    // Count NFT mints
    if (Array.isArray(tx.transaction_types) && tx.transaction_types.includes("nft_mint")) {
      nftMintedCount++;
    }

    // Count contracts deployed
    if (tx.created_contract) {
      contractsDeployedCount++;
    }

    // Track activity dates
    if (tx.timestamp) {
      const date = new Date(tx.timestamp);

      // Update first and last active dates
      if (!firstTxDate || date < firstTxDate) firstTxDate = date;
      if (!lastActiveDate || date > lastActiveDate) lastActiveDate = date;

      // Track active weeks (for weeksActive calculation)
      const weekNumber = Math.floor(date.getTime() / MS_PER_WEEK);
      activeWeeks.add(weekNumber);

      // Track active days (for consecutive weeks calculation)
      const dayString = date.toISOString().split("T")[0];
      dayActivityMap.set(dayString, true);
    }
  }

  // Calculate weeks active (unique weeks with transactions)
  const weeksActive = activeWeeks.size;

  // Calculate weeks since first transaction
  let weeksSinceFirstTransaction = 0;
  if (firstTxDate && lastActiveDate) {
    weeksSinceFirstTransaction = Math.max(
      1,
      Math.ceil((lastActiveDate.getTime() - firstTxDate.getTime()) / MS_PER_WEEK),
    );
  }

  // Calculate max consecutive active weeks
  const maxConsecutiveActiveWeeks = calculateMaxConsecutiveWeeks(dayActivityMap);

  return {
    transactions: txs.length,
    weeksActive,
    uniqueContractsInteractedWith: uniqueContracts.size,
    txTypesUsed: transactionTypeSet.size,
    hasDeployedContract: contractsDeployedCount > 0,
    contractsDeployedCount,
    nftMintedCount,
    maxConsecutiveActiveWeeks,
    weeksSinceFirstTransaction,
    lastActiveDate: lastActiveDate ? lastActiveDate.toISOString() : new Date().toISOString(),
  };
};

/**
 * Calculate the longest consecutive week streak from active days
 * Groups days into weeks and finds the longest consecutive sequence
 */
function calculateMaxConsecutiveWeeks(dayActivityMap: Map<string, boolean>): number {
  if (dayActivityMap.size === 0) return 0;

  // Sort days and group into weeks
  const sortedDays = Array.from(dayActivityMap.keys()).sort();
  const activeWeeks = new Set<number>();

  for (const dayString of sortedDays) {
    const date = new Date(dayString);
    const weekNumber = Math.floor(date.getTime() / MS_PER_WEEK);
    activeWeeks.add(weekNumber);
  }

  // Find longest consecutive week sequence
  const sortedWeeks = Array.from(activeWeeks).sort((a, b) => a - b);
  let maxConsecutive = 1;
  let currentConsecutive = 1;

  for (let i = 1; i < sortedWeeks.length; i++) {
    if (sortedWeeks[i] === sortedWeeks[i - 1] + 1) {
      currentConsecutive++;
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
    } else {
      currentConsecutive = 1;
    }
  }

  return maxConsecutive;
}
