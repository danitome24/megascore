"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  RefreshCw,
  Activity,
  TrendingUp,
  Trophy,
  Calendar,
  Hash,
  Download,
  Share2,
  Eye,
  BarChart3,
  Clock,
  Wallet,
  Target,
  CheckCircle,
  Flame,
  Star,
  Zap,
  X,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export default function MyScorePage() {
  // Animation state for update button
  const [isUpdating, setIsUpdating] = useState(false);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(847);
  const [scoreIncreased, setScoreIncreased] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);

  // SBT state
  const [isMinting, setIsMinting] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);
  const [showMintOption, setShowMintOption] = useState(false);
  const [showPersistOption, setShowPersistOption] = useState(false);

  // Demo mode for testing SBT functionality
  const [demoMode, setDemoMode] = useState(false);

  // Mock data - in real app this would come from blockchain/API
  const userScore = {
    total: displayScore,
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

  // Handle update score button click
  const handleUpdateScore = async () => {
    setIsUpdating(true);
    setScoreIncreased(false);

    // Show updating toast immediately
    toast.loading("Updating reputation...", {
      description: "Analyzing network activity",
      duration: 2000,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUpdating(false);

    // Start score animation after update completes
    const oldScore = displayScore;
    const newScore = oldScore + Math.floor(Math.random() * 50) + 10; // Random increase between 10-60
    const increase = newScore - oldScore;

    setScoreIncrease(increase);
    setIsScoreAnimating(true);
    setScoreIncreased(true);

    // Show score increase toast
    toast.success("Score updated", {
      description: `MegaReputation increased by +${increase} points`,
      duration: 4000,
    });

    // Animate score counting up
    const duration = 1500; // 1.5 seconds
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

        // Show appropriate action based on NFT ownership
        if (hasNFT) {
          setShowPersistOption(true);
        } else {
          setShowMintOption(true);
        }
      }
    }, duration / steps);
  };

  // Handle minting new SBT
  const handleMintSBT = async () => {
    setIsMinting(true);
    setShowMintOption(false);

    // Simulate minting transaction
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsMinting(false);
    setScoreIncreased(false);
    setScoreIncrease(0);

    // Show success toast
    toast.success("SBT minted successfully", {
      description: `Token ID #${displayScore} created`,
      duration: 5000,
    });
  };

  // Handle persisting score to existing SBT
  const handlePersistScore = async () => {
    setIsPersisting(true);
    setShowPersistOption(false);

    // Simulate persistence transaction
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsPersisting(false);
    setScoreIncreased(false);
    setScoreIncrease(0);

    // Show success toast
    toast.success("SBT updated successfully", {
      description: `Your score of ${displayScore} has been saved`,
      duration: 5000,
    });
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
                My Reputation
              </h1>
              <p className="text-base text-foreground/70">
                MegaETH Network Score
              </p>
            </div>
            <div className="flex gap-3 mt-3 sm:mt-0">
              {/* Demo Mode Toggle */}
              <Button
                onClick={() => setDemoMode(!demoMode)}
                variant="outline"
                className={`border-foreground/20 text-foreground/70 hover:bg-foreground/5 ${
                  demoMode
                    ? "bg-mega-green/10 border-mega-green text-mega-green"
                    : ""
                }`}
                size="sm"
              >
                Demo {demoMode ? "ON" : "OFF"}
              </Button>

              <Button
                onClick={handleUpdateScore}
                disabled={isUpdating}
                className={`
                  bg-mega-coral hover:bg-mega-coral/90 text-white border-0
                  uppercase tracking-wide font-medium transition-all duration-300 ease-in-out
                  ${
                    isUpdating
                      ? "cursor-not-allowed opacity-80"
                      : "hover:scale-105 hover:shadow-lg"
                  }
                `}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 transition-transform duration-700 ${
                    isUpdating ? "animate-spin" : ""
                  }`}
                />
                {isUpdating ? "Updating..." : "Update Score"}
              </Button>
            </div>
          </div>

          {/* Score Display */}
          <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
            <CardContent className="p-8">
              <div className="text-center">
                <div
                  className={`
                  flex items-center justify-center gap-3 mb-4
                  transition-all duration-300 relative
                  ${isScoreAnimating ? "scale-110" : "scale-100"}
                `}
                >
                  <div
                    className={`
                    text-6xl font-bold font-mono tracking-tight
                    ${scoreIncreased ? "text-mega-green" : "text-foreground"}
                  `}
                  >
                    {userScore.total}
                  </div>
                  {scoreIncreased && (
                    <div className="text-3xl font-bold text-mega-green animate-bounce">
                      +{scoreIncrease}
                    </div>
                  )}
                  {/* Celebration particles */}
                  {scoreIncreased && (
                    <>
                      <div className="absolute -top-4 -left-4 w-3 h-3 bg-mega-coral rounded-full animate-ping"></div>
                      <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-mega-blue rounded-full animate-ping animation-delay-300"></div>
                      <div className="absolute -top-4 -right-4 w-2 h-2 bg-mega-green rounded-full animate-ping animation-delay-500"></div>
                      <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-mega-pink rounded-full animate-ping animation-delay-700"></div>
                    </>
                  )}
                </div>
                <div className="text-xl text-foreground/70 mb-6 uppercase tracking-wide">
                  MegaReputation Score
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <Badge className="bg-mega-coral text-white px-4 py-2 text-base">
                    <Trophy className="w-5 h-5 mr-2" />
                    Rank #{userScore.rank}
                  </Badge>
                  <Badge className="bg-mega-blue text-white px-4 py-2 text-base">
                    Level {userScore.level}
                  </Badge>
                  <Badge className="bg-mega-green text-white px-4 py-2 text-base">
                    {userScore.percentile}th Percentile
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex justify-between text-base text-foreground/70">
                    <span>Progress to Level {userScore.level + 1}</span>
                    <span>
                      {Math.round(
                        (userScore.total / userScore.nextLevelAt) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(userScore.total / userScore.nextLevelAt) * 100}
                    className="h-4 bg-foreground/10"
                  />
                  <div className="text-sm text-foreground/60">
                    {userScore.nextLevelAt - userScore.total} points to next
                    level
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Display */}
          {hasNFT && (
            <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  {/* Columna 1: NFT Visual */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-full h-auto bg-gradient-to-br from-mega-coral via-mega-pink to-mega-blue rounded-xl p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-3 left-3 w-8 h-8 border-2 border-white rounded-full" />
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-2 border-white rounded-lg rotate-45" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full" />
                      </div>

                      {/* NFT Content */}
                      <div className="text-center z-10">
                        <div className="text-xs font-mono mb-2 opacity-80 uppercase tracking-wider">
                          MEGASCORE NFT
                        </div>
                        <div className="text-3xl font-bold mb-2 font-mono">
                          {nftData.score}
                        </div>
                        <div className="text-sm mb-2 uppercase tracking-wide">
                          Level {nftData.level}
                        </div>
                        <div className="text-xs font-mono opacity-60">
                          #{nftData.tokenId}
                        </div>
                      </div>

                      {/* MegaETH Logo */}
                      <div className="absolute bottom-3 left-3 text-xs font-mono opacity-60 uppercase tracking-wider">
                        MegaETH
                      </div>
                    </div>
                  </div>

                  {/* Columna 2: SBT Actions principales */}
                  <div className="space-y-4">
                    {/* SBT Action Alert */}
                    {scoreIncreased && !isMinting && !isPersisting && (
                      <div className="p-3 bg-mega-green/10 border border-mega-green/20 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm font-bold text-mega-green mb-1">
                            Score +{scoreIncrease}!
                          </div>
                          <div className="text-xs text-foreground/70">
                            {hasNFT ? "Update SBT" : "Mint first SBT"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mint Button */}
                    {showMintOption && (
                      <Button
                        onClick={handleMintSBT}
                        disabled={isMinting}
                        className="w-full bg-mega-coral hover:bg-mega-coral/90 text-white border-0 uppercase tracking-wide font-medium"
                      >
                        {isMinting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Minting...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4 mr-2" />
                            Mint SBT
                          </>
                        )}
                      </Button>
                    )}

                    {/* Update Button */}
                    {showPersistOption && (
                      <Button
                        onClick={handlePersistScore}
                        disabled={isPersisting}
                        className="w-full bg-mega-blue hover:bg-mega-blue/90 text-white border-0 uppercase tracking-wide font-medium"
                      >
                        {isPersisting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Hash className="w-4 h-4 mr-2" />
                            Update SBT
                          </>
                        )}
                      </Button>
                    )}

                    {/* Disabled Update Button */}
                    {!showPersistOption &&
                      !showMintOption &&
                      !isMinting &&
                      !isPersisting && (
                        <Button
                          disabled={true}
                          className="w-full bg-foreground/10 text-foreground/50 border-0 uppercase tracking-wide font-medium cursor-not-allowed"
                        >
                          <Hash className="w-4 h-4 mr-2" />
                          Update SBT
                        </Button>
                      )}

                    <div className="text-xs text-foreground/60 text-center px-2">
                      {!scoreIncreased
                        ? "Update score to enable SBT actions"
                        : "Ready to update SBT"}
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-mega-blue text-mega-blue hover:bg-mega-blue hover:text-white bg-transparent text-xs"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-mega-green text-mega-green hover:bg-mega-green hover:text-white bg-transparent text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Explorer
                      </Button>
                    </div>
                  </div>

                  {/* Columna 3: NFT Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground uppercase tracking-wide mb-3">
                        NFT Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Token ID</span>
                          <span className="font-mono">#{nftData.tokenId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Level</span>
                          <span className="font-bold text-mega-blue">
                            {nftData.level}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Minted</span>
                          <span className="font-mono">{nftData.mintDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">
                            Last Update
                          </span>
                          <span className="font-mono">
                            {nftData.lastUpdate}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-mega-pink text-white px-3 py-1 text-sm mt-3">
                        <Hash className="w-4 h-4 mr-2" />
                        Soulbound NFT
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo Mode Controls */}
          {demoMode && (
            <Card className="bg-background border-2 border-mega-green/50 shadow-xl overflow-hidden relative mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-green to-mega-blue"></div>
              <CardHeader className="border-b border-foreground/10 p-4">
                <CardTitle className="flex items-center text-lg uppercase tracking-wide text-mega-green">
                  <Zap className="w-5 h-5 mr-3" />
                  Demo Mode - Test SBT Functionality
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      setScoreIncrease(25);
                      setScoreIncreased(true);
                      setShowMintOption(true);
                    }}
                    className="bg-mega-coral hover:bg-mega-coral/90 text-white border-0 uppercase tracking-wide"
                    disabled={
                      showMintOption ||
                      showPersistOption ||
                      isMinting ||
                      isPersisting
                    }
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Test Mint SBT
                  </Button>

                  <Button
                    onClick={() => {
                      setScoreIncrease(15);
                      setScoreIncreased(true);
                      setShowPersistOption(true);
                    }}
                    className="bg-mega-blue hover:bg-mega-blue/90 text-white border-0 uppercase tracking-wide"
                    disabled={
                      showMintOption ||
                      showPersistOption ||
                      isMinting ||
                      isPersisting
                    }
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    Test Persist Score
                  </Button>

                  <Button
                    onClick={() => {
                      setShowMintOption(false);
                      setShowPersistOption(false);
                      setScoreIncreased(false);
                      setScoreIncrease(0);
                      setIsMinting(false);
                      setIsPersisting(false);
                    }}
                    variant="outline"
                    className="border-foreground/20 text-foreground/70 hover:bg-foreground/5 uppercase tracking-wide"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reset State
                  </Button>

                  <div className="text-sm text-foreground/60 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Demo mode for testing SBT flows
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SBT Minting in Progress */}
          {isMinting && (
            <Card className="bg-background border-2 border-mega-coral shadow-xl overflow-hidden relative mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral to-mega-pink animate-pulse"></div>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-mega-coral rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wide mb-2">
                    Minting Your SBT
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Please wait while we mint your Soulbound Token on the
                    MegaETH network...
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-mega-coral rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-mega-coral rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-3 h-3 bg-mega-coral rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                    <p className="text-sm text-foreground/60">
                      This may take a few moments to complete on the blockchain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SBT Persistence in Progress */}
          {isPersisting && (
            <Card className="bg-background border-2 border-mega-blue shadow-xl overflow-hidden relative mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-blue to-mega-green animate-pulse"></div>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-mega-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Hash className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wide mb-2">
                    Updating Your SBT
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Please wait while we update your Soulbound Token with your
                    new score...
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-3 h-3 bg-mega-blue rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                    <p className="text-sm text-foreground/60">
                      Persisting your new achievement to the blockchain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Gathered Section */}
          <Card className="bg-background border-2 border-foreground/20 shadow-xl">
            <CardHeader className="border-b border-foreground/10 p-4">
              <CardTitle className="flex items-center text-lg uppercase tracking-wide">
                <BarChart3 className="w-5 h-5 mr-3 text-mega-coral" />
                Data Gathered
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-coral/5 transition-colors">
                  <div className="text-2xl font-bold text-mega-coral mb-2">
                    {scoreData.transactions}
                  </div>
                  <div className="text-sm text-foreground/70 uppercase tracking-wide">
                    Transactions
                  </div>
                </div>
                <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-blue/5 transition-colors">
                  <div className="text-2xl font-bold text-mega-blue mb-2">
                    {scoreData.contractsInteracted}
                  </div>
                  <div className="text-sm text-foreground/70 uppercase tracking-wide">
                    Contracts
                  </div>
                </div>
                <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-green/5 transition-colors">
                  <div className="text-2xl font-bold text-mega-green mb-2">
                    {scoreData.protocolsTested}
                  </div>
                  <div className="text-sm text-foreground/70 uppercase tracking-wide">
                    Protocols
                  </div>
                </div>
                <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-pink/5 transition-colors">
                  <div className="text-2xl font-bold text-mega-pink mb-2">
                    {scoreData.activeDays}
                  </div>
                  <div className="text-sm text-foreground/70 uppercase tracking-wide">
                    Active Days
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-foreground/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70 uppercase tracking-wide">
                      Total Volume
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {scoreData.totalVolume}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70 uppercase tracking-wide">
                      Last Activity
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {scoreData.lastActivity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-foreground/20 rounded-lg bg-gradient-to-r from-mega-coral/5 to-mega-blue/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-mega-coral mb-1">
                      +{scoreData.weeklyGrowth}%
                    </div>
                    <div className="text-sm text-foreground/70 uppercase tracking-wide">
                      Weekly Growth
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-mega-blue mb-1">
                      +{scoreData.monthlyGrowth}%
                    </div>
                    <div className="text-sm text-foreground/70 uppercase tracking-wide">
                      Monthly Growth
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
