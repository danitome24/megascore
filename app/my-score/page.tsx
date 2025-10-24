"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { MyScoreHeader } from "@/components/my-score/header";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
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
            <ScoreDisplaySection />
            <NFTDisplaySection />
            <DataGatheredSection />
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
