import { useCallback, useState } from "react";
import { updateMetrics as updateMetricsAPI } from "@/lib/external/api/metrics";
import { updateScore as updateScoreAPI } from "@/lib/external/api/score";
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

    setIsUpdating(true);
    const toastId = toast.loading("Committing score update...", {
      description: "Persisting your reputation update",
    });

    try {
      // Update score in API (old score goes to scores_history, new score becomes current)
      await updateScoreAPI(address, updatedScore, currentScore);

      // Update metrics in API if both exist (old metrics goes to metrics_history, new metrics becomes current)
      if (currentMetrics && updatedMetrics) {
        await updateMetricsAPI(address, updatedMetrics, currentMetrics);
        commitMetricsUpdate();
      }

      // Update store: set currentScore to updatedScore and reset updatedScore
      commitScoreUpdate();

      toast.success("Score committed!", {
        description: "Your reputation has been permanently updated",
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to commit score update", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
        id: toastId,
      });
      console.error("Error committing score update:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [address, updatedScore, currentScore, currentMetrics, updatedMetrics, commitScoreUpdate, commitMetricsUpdate]);

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
