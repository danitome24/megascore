"use client";

import { CalculateButton } from "@/components/my-score/initial/calculate-button";
import { InitialScoreCard } from "@/components/my-score/initial/initial-score-card";

interface InitialScoreDisplayProps {
  onCalculate: () => Promise<void>;
  isLoading?: boolean;
}

export function InitialScoreDisplay({ onCalculate, isLoading = false }: InitialScoreDisplayProps) {
  return (
    <div className="space-y-6">
      <InitialScoreCard />
      <CalculateButton onCalculate={onCalculate} isLoading={isLoading} />
    </div>
  );
}
