"use client";

import { PageContainer } from "@/components/layout/page-container";
import { MyScoreHeader } from "@/components/my-score/header";
import { ScoreDisplay } from "@/components/my-score/score-display";
import { NFTDisplay } from "@/components/my-score/nft-display";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import type {
  Score,
  NFTData,
  Metrics,
  ScoreHistory,
  AchievedGoal,
} from "@/types/common";

export default function MyScorePage() {
  // Mock data - in real app this would come from blockchain/API
  const userScore: Score = {
    total: 847,
    rank: 156,
    percentile: 85,
    level: 8,
    nextLevelAt: 1000,
    daysActive: 24,
    weeklyGrowth: 12,
  };

  // NFT data - show if user owns one
  const hasNFT: boolean = true;
  const nftData: NFTData = {
    tokenId: "847",
    score: 847,
    level: 8,
    mintDate: "2024-03-15",
    lastUpdate: "2024-12-07",
    attributes: [
      { trait: "Network Activity", value: "High", rarity: "15%" },
      { trait: "Testnet Pioneer", value: "Yes", rarity: "8%" },
      { trait: "Early Adopter", value: "Genesis", rarity: "3%" },
      { trait: "Consistency", value: "Diamond Hands", rarity: "12%" },
    ],
  };

  // Simplified score breakdown - just data gathered
  const scoreData: Metrics = {
    transactions: 45,
    contractsInteracted: 12,
    protocolsTested: 8,
    activeDays: 24,
    totalVolume: "127.5 ETH",
    lastActivity: "2 hours ago",
    weeklyGrowth: 12,
    monthlyGrowth: 45,
  };

  // Use custom hook for score update logic
  const {
    isUpdating,
    isScoreAnimating,
    displayScore,
    scoreIncreased,
    scoreIncrease,
    handleUpdateScore,
  } = useUpdateScore(847, hasNFT);

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <MyScoreHeader
            isUpdating={isUpdating}
            handleUpdateScore={handleUpdateScore}
          />
          <ScoreDisplay
            userScore={userScore}
            scoreIncreased={scoreIncreased}
            scoreIncrease={scoreIncrease}
            isScoreAnimating={isScoreAnimating}
          />
          <NFTDisplay
            hasNFT={hasNFT}
            nftData={nftData}
            displayScore={displayScore}
          />
          <DataGatheredSection scoreData={scoreData} />
        </div>
      </div>
    </PageContainer>
  );
}
