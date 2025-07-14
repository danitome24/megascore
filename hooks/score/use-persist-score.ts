import { useState, useCallback } from "react";
import { toast } from "sonner";

export function usePersistScore(displayScore: number) {
  const [isPersisting, setIsPersisting] = useState(false);
  const [showPersistOption, setShowPersistOption] = useState(false);
  const [scoreIncreased, setScoreIncreased] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);

  const handlePersistScore = useCallback(async () => {
    setIsPersisting(true);
    setShowPersistOption(false);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsPersisting(false);
    setScoreIncreased(false);
    setScoreIncrease(0);
    toast.success("SBT updated successfully", {
      description: `Your score of ${displayScore} has been saved`,
      duration: 5000,
    });
  }, [displayScore]);

  return {
    isPersisting,
    showPersistOption,
    scoreIncreased,
    scoreIncrease,
    handlePersistScore,
  };
}
