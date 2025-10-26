"use client";

import { useEffect, useState } from "react";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { PageContainer } from "@/components/layout/page-container";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { MyScoreHeader } from "@/components/my-score/header";
import { InitialScoreDisplay } from "@/components/my-score/initial-score-display";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
import { ScoreCalculatedDisplay } from "@/components/my-score/score-calculated-display";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { Loading } from "@/components/ui/loading";
import { createAccount as apiCreateAccount, fetchAccountData } from "@/lib/external/api/account";
import { createMetrics as apiCreateMetrics } from "@/lib/external/api/metrics";
import { createScore as apiCreateScore } from "@/lib/external/api/score";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

export default function MyScorePage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [scoreState, setScoreState] = useState<"loading" | "initial" | "calculated" | "minted">("loading");

  const { address } = useAccount();
  const { setCurrentScore, setHasNFT, setCurrentMetrics, currentScore } = useScoreStore();

  useEffect(() => {
    if (!address) return;
    setScoreState("loading");
    (async () => {
      const data = await fetchAccountData(address);
      if (data && data.account) {
        const hasScore = data.score?.score ?? 0;
        setCurrentScore(hasScore);
        setHasNFT(!!data.account.mintedAt);
        if (data.metrics?.data) {
          setCurrentMetrics(data.metrics.data);
        }
        // Set state based on data
        if (!!data.account.mintedAt) {
          setScoreState("minted");
        } else if (hasScore > 0) {
          setScoreState("calculated");
        } else {
          setScoreState("initial");
        }
      } else {
        setScoreState("initial");
      }
    })();
  }, [address, setCurrentScore, setHasNFT]);

  const handleCalculateScore = async () => {
    setIsCalculating(true);
    try {
      // TODO: Call API to calculate score
      console.log("Calculating score for:", address);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      // Update store with calculated score
      const calculatedScore = Math.floor(Math.random() * 800) + 200; // Random score between 200-1000
      setCurrentScore(calculatedScore);
      setScoreState("calculated");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleMintNFT = async () => {
    if (!address) return;
    setIsMinting(true);
    try {
      // 1. Call blockchain minting logic (simulate for now)
      console.log("Minting NFT for:", address);
      await new Promise(resolve => setTimeout(resolve, 2500));

      const account = await apiCreateAccount(address);
      await apiCreateScore(account.id, currentScore);

      // Mock random metrics data for demo
      const metricsData = {
        transactions: Math.floor(Math.random() * 1000),
        weeksActive: Math.floor(Math.random() * 52),
        uniqueContractsInteractedWith: Math.floor(Math.random() * 50),
        txTypesUsed: Math.floor(Math.random() * 10),
        hasDeployedContract: Math.random() > 0.5,
        contractsDeployedCount: Math.floor(Math.random() * 5),
        nftMintedCount: Math.floor(Math.random() * 10),
        maxConsecutiveActiveWeeks: Math.floor(Math.random() * 20),
        weeksSinceFirstTransaction: Math.floor(Math.random() * 52),
        lastActiveDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      };
      await apiCreateMetrics(account.id, metricsData);

      setHasNFT(true);
      setScoreState("minted");
    } catch (error) {
      console.error("Minting or DB error:", error);
      // Optionally show a toast or error message here
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <PageContainer>
      <ConnectOverlay>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <MyScoreHeader />

            {scoreState === "loading" && <Loading title="Loading your score..." className="py-12" />}

            {scoreState === "initial" && (
              <InitialScoreDisplay onCalculate={handleCalculateScore} isLoading={isCalculating} />
            )}

            {scoreState === "calculated" && (
              <ScoreCalculatedDisplay score={currentScore} onMint={handleMintNFT} isLoading={isMinting} />
            )}

            {scoreState === "minted" && (
              <>
                <ScoreDisplaySection />
                <NFTDisplaySection />
                <DataGatheredSection />
              </>
            )}
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
