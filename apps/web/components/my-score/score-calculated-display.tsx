"use client";

import { CalculatedScoreCard } from "./calculated/calculated-score-card";
import { MintNFTCard } from "./calculated/mint-nft-card";

interface ScoreCalculatedDisplayProps {
  score: number;
  onMint: () => Promise<void>;
  isLoading?: boolean;
}

export function ScoreCalculatedDisplay({ score, onMint, isLoading = false }: ScoreCalculatedDisplayProps) {
  return (
    <div className="space-y-6">
      <CalculatedScoreCard score={score} />
      {score > 0 && <MintNFTCard onMint={onMint} isLoading={isLoading} />}
    </div>
  );
}
