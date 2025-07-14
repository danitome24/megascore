"use client";

import { TrendingUp, Flame, Star, Zap } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { MyScoreHeader } from "@/components/my-score/header";
import { ScoreDisplay } from "@/components/my-score/score-display";
import { NFTDisplay } from "@/components/my-score/nft-display";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { useUpdateScore } from "@/hooks/score/use-update-score";

export default function MyScorePage() {
  // Mock data - in real app this would come from blockchain/API
  const userScore = {
    total: 847,
    rank: 156,
    percentile: 85,
    level: 8,
    nextLevelAt: 1000,
    daysActive: 24,
    weeklyGrowth: 12,
  };

  // NFT data - show if user owns one
  const hasNFT = true;
  const nftData = {
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
  const scoreData = {
    transactions: 45,
    contractsInteracted: 12,
    protocolsTested: 8,
    activeDays: 24,
    totalVolume: "127.5 ETH",
    lastActivity: "2 hours ago",
    weeklyGrowth: 12,
    monthlyGrowth: 45,
  };

  // Score history data
  const scoreHistory = [
    { date: "2024-12-01", score: 760 },
    { date: "2024-12-02", score: 775 },
    { date: "2024-12-03", score: 780 },
    { date: "2024-12-04", score: 795 },
    { date: "2024-12-05", score: 815 },
    { date: "2024-12-06", score: 830 },
    { date: "2024-12-07", score: 847 },
  ];

  // Achieved goals
  const achievedGoals = [
    {
      id: 1,
      title: "4 Weeks Consecutive Transactions",
      description: "Made at least one transaction every day for 4 weeks",
      achievedDate: "2024-12-01",
      icon: Flame,
      color: "mega-coral",
      rarity: "15% of users",
    },
    {
      id: 2,
      title: "Smart Contract Explorer",
      description: "Interacted with 10+ different smart contracts",
      achievedDate: "2024-11-28",
      icon: Zap,
      color: "mega-blue",
      rarity: "8% of users",
    },
    {
      id: 3,
      title: "Testnet Pioneer",
      description: "One of the first 100 users to join the testnet",
      achievedDate: "2024-11-15",
      icon: Star,
      color: "mega-green",
      rarity: "3% of users",
    },
    {
      id: 4,
      title: "High Volume Trader",
      description: "Achieved over 100 ETH in total transaction volume",
      achievedDate: "2024-11-25",
      icon: TrendingUp,
      color: "mega-pink",
      rarity: "12% of users",
    },
  ];

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
