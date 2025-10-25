import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useMintSBT(displayScore: number) {
  const [isMinting, setIsMinting] = useState(false);
  const [showMintOption, setShowMintOption] = useState(false);
  const [scoreIncreased, setScoreIncreased] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);

  const handleMintSBT = useCallback(async () => {
    setIsMinting(true);
    setShowMintOption(false);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsMinting(false);
    setScoreIncreased(false);
    setScoreIncrease(0);
    toast.success("SBT minted successfully", {
      description: `Token ID #${displayScore} created`,
      duration: 5000,
    });
  }, [displayScore]);

  return {
    isMinting,
    showMintOption,
    scoreIncreased,
    scoreIncrease,
    handleMintSBT,
  };
}
