"use client";

import { useEffect } from "react";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { PageContainer } from "@/components/layout/page-container";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { MyScoreHeader } from "@/components/my-score/header";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { useScoreStore } from "@/store/score-store";

export default function MyScorePage() {
  const { setCurrentScore, setHasNFT } = useScoreStore();

  // Initialize with mock data on mount
  useEffect(() => {
    // In real app, fetch score from database/API
    setCurrentScore(847);
    setHasNFT(true);
  }, [setCurrentScore, setHasNFT]);

  const hasNFT = false;
  return (
    <PageContainer>
      <ConnectOverlay>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <MyScoreHeader />
            <ScoreDisplaySection />
            {hasNFT && <NFTDisplaySection />}
            {hasNFT && <DataGatheredSection />}
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
