"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { MyScoreHeader } from "@/components/my-score/header";
import { ScoreDisplay } from "@/components/my-score/score-display";
import { NFTDisplay } from "@/components/my-score/nft-display";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { useScoreStore } from "@/lib/store/score-store";

export default function MyScorePage() {
  const { setCurrentScore, setHasNFT } = useScoreStore();

  // Initialize with mock data on mount
  useEffect(() => {
    // In real app, fetch score from database/API
    setCurrentScore(847);
    setHasNFT(true);
  }, [setCurrentScore, setHasNFT]);

  return (
    <PageContainer>
      <ConnectOverlay>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <MyScoreHeader />
            <ScoreDisplay />
            <NFTDisplay />
            <DataGatheredSection />
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
