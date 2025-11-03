"use client";

import { useMintReputationOnChain } from "@/hooks/contracts/use-mint-reputation-on-chain";
import { MetricScore } from "@/lib/domain/reputation/types";
import { createAccount as apiCreateAccount } from "@/lib/external/api/account";
import { createMetrics as apiCreateMetrics } from "@/lib/external/api/metrics";
import { createScore as apiCreateScore } from "@/lib/external/api/score";
import { useAccountStore } from "@/store/account-store";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

/**
 * Hook: Handle NFT minting and database persistence
 */
export function useReputation() {
  const { address } = useAccount();
  const { setAccount, setLoading, setError } = useAccountStore();
  const { setHasNFT } = useScoreStore();
  const { mintOnChain, isMinting } = useMintReputationOnChain();

  const mint = async (currentScore: number, currentMetrics: MetricScore[]) => {
    if (!address || !currentScore || !currentMetrics) {
      return { success: false };
    }

    try {
      setLoading(true);

      // 1. Mint on blockchain
      // const txHash = await mintOnChain(currentScore);
      const txHash = "0x0qkjelqkwjelqwje";

      // 2. Create account in DB
      const newAccountData = await apiCreateAccount(address, txHash);

      // 3. Create score record
      await apiCreateScore(newAccountData.id, currentScore);

      // 4. Create metrics
      await apiCreateMetrics(newAccountData.id, currentMetrics);

      setAccount(newAccountData);
      setHasNFT(true);
      setError(null);

      return { success: true };
    } catch (error) {
      console.error("Minting error:", error);
      setError(error as Error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { mint, isMinting };
}
