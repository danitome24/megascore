import { fetchTransactions } from "@/lib/external/sources/transactions";
import { mapTxsToMetrics } from "@/lib/mappers/txs-to-metrics";
import { Address, Metrics } from "@/types/common";

export const metrics = async (wallet: Address): Promise<Metrics> => {
  const apiData = await fetchTransactions(wallet);
  console.log(`Fetched ${apiData.items.length || 0} transactions for wallet ${wallet}`);
  return mapTxsToMetrics(apiData);
};
