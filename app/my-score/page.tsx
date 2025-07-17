"use client";

import { PageContainer } from "@/components/layout/page-container";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
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
  Rank,
} from "@/types/common";

export default function MyScorePage() {
  // Mock data - in real app this would come from blockchain/API
  const score: Score = {
    total: 847,
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
    level: 8,
    percentile: 85,
    nextLevelAt: 1000,
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
              scoreIncreased={scoreIncreased}
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
