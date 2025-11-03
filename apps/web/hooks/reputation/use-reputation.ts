"use client";

import { useMintReputationOnChain } from "@/hooks/contracts/use-mint-reputation-on-chain";
import { useUpdateReputationOnChain } from "@/hooks/contracts/use-update-reputation-on-chain";
import { MetricScore } from "@/lib/domain/reputation/types";
import { createAccount as apiCreateAccount } from "@/lib/external/api/account";
import { createMetrics as apiCreateMetrics } from "@/lib/external/api/metrics";
import { updateMetrics as apiUpdateMetrics } from "@/lib/external/api/metrics";
import { createScore as apiCreateScore } from "@/lib/external/api/score";
import { updateScore as apiUpdateScore } from "@/lib/external/api/score";
import { useAccountStore } from "@/store/account-store";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

/**
 * Hook: Complete reputation management workflow
 * - Mint new reputation NFT (on-chain + DB)
 * - Update existing reputation (on-chain + DB)
 */
export function useReputation() {
  const { address } = useAccount();
  const { setAccount, setLoading, setError } = useAccountStore();
  const { setHasNFT } = useScoreStore();
  const { mintOnChain, isMinting } = useMintReputationOnChain();
  const { updateOnChain, isUpdating } = useUpdateReputationOnChain();

  const mint = async (
    currentScore: number,
    currentMetrics: MetricScore[],
  ): Promise<{ success: boolean; error?: unknown }> => {
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

  const update = async (
    newScore: number,
    currentScore: number,
    currentMetrics: MetricScore[],
    updatedMetrics: MetricScore[],
    existingUri: string,
  ) => {
    if (!address || !newScore || !updatedMetrics) {
      return { success: false };
    }

    try {
      setLoading(true);

      // 1. Update on blockchain
      const txHash = await updateOnChain(newScore, existingUri);

      // 2. Update score in API (old score goes to scores_history, new score becomes current)
      await apiUpdateScore(address, newScore, currentScore);

      // 3. Update metrics in API if both exist (old metrics goes to metrics_history, new metrics becomes current)
      if (currentMetrics && updatedMetrics) {
        await apiUpdateMetrics(address, updatedMetrics, currentMetrics);
      }

      setError(null);

      return { success: true };
    } catch (error) {
      console.error("Update error:", error);
      setError(error as Error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { mint, update, isMinting, isUpdating };
}
