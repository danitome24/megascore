import { useCallback, useState } from "react";
import { useScoreStore } from "@/store/score-store";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export function useUpdateScore() {
  const { address } = useAccount();
  const { currentScore, updatedScore, scoreIncrease, hasNFT, setUpdatedScore, persistScoreToNFT } = useScoreStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(currentScore);

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
      // Fetch calculated score from API
      const response = await fetch(`/api/score/calculate?wallet=${address}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to calculate score");
      }

      const data = await response.json();

      if (data.status !== 200 || !data.score?.total) {
        throw new Error(data.error || "Invalid score response");
      }

      const newScore = data.score.total;
      const increase = newScore - currentScore;

      setIsUpdating(false);

      // Update store with new score
      setUpdatedScore(newScore);
      setIsScoreAnimating(true);

      toast.success("Score updated!", {
        description: `MegaReputation increased by +${increase} points`,
        duration: 4000,
        id: toastId,
      });

      // Animate score transition
      const oldScore = displayScore;
      const duration = 1500;
      const steps = 60;
      const increment = increase / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const animatedScore = Math.floor(oldScore + increment * currentStep);
        setDisplayScore(animatedScore);
        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayScore(newScore);
          setIsScoreAnimating(false);
        }
      }, duration / steps);
    } catch (error) {
      setIsUpdating(false);
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Failed to update score", {
        description: errorMsg,
        id: toastId,
      });
      console.error("Error updating score:", error);
    }
  }, [address, currentScore, displayScore, setUpdatedScore]);

  return {
    isUpdating,
    isScoreAnimating,
    displayScore,
    currentScore,
    updatedScore,
    scoreIncrease,
    hasNFT,
    hasUpdatePending: updatedScore !== null,
    handleUpdateScore,
    persistScoreToNFT,
  };
}
