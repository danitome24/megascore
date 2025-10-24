"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { MyScoreHeader } from "@/components/my-score/header";
import { ScoreDisplay } from "@/components/my-score/score-display";
import { NFTDisplay } from "@/components/my-score/nft-display";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useScoreStore } from "@/lib/store/score-store";
import type {
  Score,
  NFTData,
  Metrics,
  ScoreHistory,
  AchievedGoal,
  Rank,
} from "@/types/common";

export default function MyScorePage() {
  // Initialize store and state
  const {
    currentScore,
    updatedScore,
    scoreIncrease,
    hasNFT,
    setCurrentScore,
    setHasNFT,
  } = useScoreStore();

  const {
    isUpdating,
    isScoreAnimating,
    displayScore,
    handleUpdateScore,
    persistScoreToNFT,
  } = useUpdateScore();

  // Initialize with mock data on mount
  useEffect(() => {
    // In real app, fetch score from database/API
    setCurrentScore(847);
    setHasNFT(true);
  }, [setCurrentScore, setHasNFT]);

  // NFT data - show if user owns one
  const nftData: NFTData = {
    tokenId: String(currentScore),
    score: currentScore,
    level: Math.floor(currentScore / 100),
    mintDate: "2024-03-15",
    lastUpdate: new Date().toISOString().split("T")[0],
    attributes: [
      { trait: "Network Activity", value: "High", rarity: "15%" },
      { trait: "Testnet Pioneer", value: "Yes", rarity: "8%" },
      { trait: "Early Adopter", value: "Genesis", rarity: "3%" },
      { trait: "Consistency", value: "Diamond Hands", rarity: "12%" },
    ],
  };

  // Simplified score breakdown - just data gathered
  const metrics: Metrics = {
    transactions: 43,
    weeksActive: 2,
    uniqueContractsInteractedWith: 5,
    txTypesUsed: 3,
    hasDeployedContract: true,
    contractsDeployedCount: 2,
    nftMintedCount: 4,
    maxConsecutiveActiveWeeks: 1,
    weeksSinceFirstTransaction: 10,
    lastActiveDate: new Date("2024-12-01"),
  };

  const rank: Rank = {
    rank: 156,
    level: Math.floor(currentScore / 100),
    percentile: 85,
    nextLevelAt: 1000,
  };

  // Score object for display
  const score: Score = {
    total: currentScore,
  };

  return (
    <PageContainer>
      <ConnectOverlay>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <MyScoreHeader
              isUpdating={isUpdating}
              handleUpdateScore={handleUpdateScore}
            />
            <ScoreDisplay
              userScore={score}
              rank={rank}
              scoreIncreased={updatedScore !== null}
              scoreIncrease={scoreIncrease}
              isScoreAnimating={isScoreAnimating}
            />
            <NFTDisplay
              hasNFT={hasNFT}
              nftData={nftData}
              displayScore={displayScore}
            />
            <DataGatheredSection scoreData={metrics} />
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
