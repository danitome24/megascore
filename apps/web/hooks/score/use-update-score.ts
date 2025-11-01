import { useCallback, useState } from "react";
import { useScoreStore } from "@/store/score-store";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export function useUpdateScore() {
  const { address } = useAccount();
  const {
    currentScore,
    updatedScore,
    scoreIncrease,
    hasNFT,
    currentMetrics,
    updatedMetrics,
    setUpdatedScore,
    setUpdatedMetrics,
    commitScoreUpdate,
    commitMetricsUpdate,
    persistScoreToNFT,
  } = useScoreStore();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateScore = useCallback(async () => {
    if (!address) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to update your score",
      });
      return;
    }
    setIsUpdating(true);
    const toastId = toast.loading("Updating reputation...", {
      description: "Analyzing network activity on MegaETH",
      duration: 2000,
    });
    try {
      const response = await fetch(`/api/score/calculate?wallet=${address}`);
      if (!response.ok) throw new Error("Failed to calculate score");
      const data = await response.json();
      if (data.status !== 200 || !data.score?.total) throw new Error(data.error || "Invalid score response");
      const newScore = data.score.total;
      const newMetrics = data.metrics;
      setUpdatedScore(newScore);
      setUpdatedMetrics(newMetrics);
      toast.success("Score updated!", {
        description: `MegaReputation increased by +${newScore - currentScore} points`,
        duration: 4000,
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to update score", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
        id: toastId,
      });
      console.error("Error updating score:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [address, currentScore, setUpdatedScore, setUpdatedMetrics]);

  const commitUpdate = useCallback(async () => {
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }

    if (updatedScore === null) {
      toast.error("No score update to commit");
      return;
    }

    // Simply update the store: set currentScore to updatedScore and reset updatedScore
    commitScoreUpdate();

    if (currentMetrics && updatedMetrics) {
      commitMetricsUpdate();
    }

    toast.success("Score updated!", {
      description: "Your reputation has been updated",
    });
  }, [address, updatedScore, commitScoreUpdate, commitMetricsUpdate, currentMetrics, updatedMetrics]);

  return {
    isUpdating,
    currentScore,
    updatedScore,
    scoreIncrease,
    hasNFT,
    hasUpdatePending: updatedScore !== null,
    handleUpdateScore,
    commitUpdate,
    persistScoreToNFT,
  };
}
