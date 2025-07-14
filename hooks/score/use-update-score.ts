import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useUpdateScore(initialScore: number, hasNFT: boolean) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(initialScore);
  const [scoreIncreased, setScoreIncreased] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [showMintOption, setShowMintOption] = useState(false);
  const [showPersistOption, setShowPersistOption] = useState(false);

  const handleUpdateScore = useCallback(async () => {
    setIsUpdating(true);
    setScoreIncreased(false);

    toast.loading("Updating reputation...", {
      description: "Analyzing network activity",
      duration: 2000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUpdating(false);

    const oldScore = displayScore;
    const newScore = oldScore + Math.floor(Math.random() * 50) + 10;
    const increase = newScore - oldScore;

    setScoreIncrease(increase);
    setIsScoreAnimating(true);
    setScoreIncreased(true);

    toast.success("Score updated", {
      description: `MegaReputation increased by +${increase} points`,
      duration: 4000,
    });

    const duration = 1500;
    const steps = 60;
    const increment = (newScore - oldScore) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentScore = Math.floor(oldScore + increment * currentStep);
      setDisplayScore(currentScore);
      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayScore(newScore);
        setIsScoreAnimating(false);
        if (hasNFT) {
          setShowPersistOption(true);
        } else {
          setShowMintOption(true);
        }
      }
    }, duration / steps);
  }, [displayScore, hasNFT]);

  return {
    isUpdating,
    isScoreAnimating,
    displayScore,
    scoreIncreased,
    scoreIncrease,
    showMintOption,
    showPersistOption,
    handleUpdateScore,
  };
}
