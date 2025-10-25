"use client";

import { useEffect } from "react";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { PageContainer } from "@/components/layout/page-container";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { MyScoreHeader } from "@/components/my-score/header";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

async function fetchAccountData(walletAddress: string) {
  const res = await fetch(`/api/account/${walletAddress}`);
  if (!res.ok) return null;
  return res.json();
}

export default function MyScorePage() {
  const { setCurrentScore, setHasNFT, hasNFT } = useScoreStore();
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const data = await fetchAccountData(address);
      if (data && data.account) {
        setCurrentScore(data.score?.score ?? 0);
        setHasNFT(!!data.account.mintedAt);
      }
    })();
  }, [address, setCurrentScore, setHasNFT]);

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
