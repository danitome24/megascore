import { Address, Metrics } from "@/types/common";
import { fetchTransactions } from "@/lib/sources/transactions";
import { mapTxsToMetrics } from "@/lib/mappers/txs-to-metrics";

export const metrics = async (wallet: Address): Promise<Metrics> => {
  const apiData = await fetchTransactions(wallet);
  console.log(
    `Fetched ${apiData.items.length || 0} transactions for wallet ${wallet}`
  );
  return mapTxsToMetrics(apiData);
};
