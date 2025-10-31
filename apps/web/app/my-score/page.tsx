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
import { useMintReputation } from "@/hooks/contracts/use-mint-reputation";
import { createAccount as apiCreateAccount, fetchAccountData } from "@/lib/external/api/account";
import { createMetrics as apiCreateMetrics } from "@/lib/external/api/metrics";
import { createScore as apiCreateScore } from "@/lib/external/api/score";
import { useScoreStore } from "@/store/score-store";
import { useAccountStore } from "@/store/account-store";
import { useAccount } from "wagmi";

export default function MyScorePage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [scoreState, setScoreState] = useState<"loading" | "initial" | "calculated" | "minted">("loading");

  const { address } = useAccount();
  const { setCurrentScore, setHasNFT, setCurrentMetrics, currentScore } = useScoreStore();
  const { setAccount, setLoading: setAccountLoading, setError: setAccountError } = useAccountStore();
  const { mintReputation, isMinting } = useMintReputation();

  useEffect(() => {
    if (!address) return;
    setScoreState("loading");
    setAccountLoading(true);

    (async () => {
      try {
        const data = await fetchAccountData(address);
        if (data && data.account) {
          // Update account store - API already returns proper Account type
          setAccount(data.account);

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

          setAccountError(null);
        } else {
          setScoreState("initial");
          setAccount(null);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        setAccountError(error as Error);
        setScoreState("initial");
      } finally {
        setAccountLoading(false);
      }
    })();
  }, [address, setCurrentScore, setHasNFT, setCurrentMetrics, setAccount, setAccountLoading, setAccountError]);

  const handleCalculateScore = async () => {
    if (!address) return;
    setIsCalculating(true);
    try {
      // Call API to calculate score
      const response = await fetch(`/api/score/calculate?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to calculate score");
      }

      const data = await response.json();
      const calculatedScore = data.score.total;
      setCurrentScore(calculatedScore);
      setScoreState("calculated");
    } catch (error) {
      console.error("Error calculating score:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleMintNFT = async () => {
    if (!address || !currentScore) return;
    try {
      setAccountLoading(true);

      // 1. Call blockchain minting logic using the hook
      const txHash = await mintReputation(currentScore);

      // 2. Create account in DB with mint_tx
      const newAccountData = await apiCreateAccount(address, txHash);

      // 3. Update account store with full account data
      setAccount(newAccountData);

      // 4. Create score record
      await apiCreateScore(newAccountData.id, currentScore);

      // 5. Create metrics
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
      await apiCreateMetrics(newAccountData.id, metricsData);

      setHasNFT(true);
      setScoreState("minted");
      setAccountError(null);
    } catch (error) {
      console.error("Minting or DB error:", error);
      setAccountError(error as Error);
    } finally {
      setAccountLoading(false);
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
