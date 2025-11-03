import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNFTOnChain } from "@/hooks/contracts/use-nft-details-on-chain";
import { useUpdateReputationOnChain } from "@/hooks/contracts/use-update-reputation-on-chain";
import { useReputation } from "@/hooks/reputation/use-reputation";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { getLevelByScore } from "@/lib/domain/reputation/level";
import { extractImageFromTokenUri } from "@/lib/utils";
import { useAccountStore } from "@/store/account-store";
import { useMetricsStore } from "@/store/metrics-store";
import { useScoreStore } from "@/store/score-store";
import { Eye, Hash, Share2 } from "lucide-react";
import { useChainId } from "wagmi";

export function NFTDisplaySection() {
  const { account } = useAccountStore();
  const { hasNFT, currentScore, updatedScore } = useScoreStore();
  const { currentMetrics, updatedMetrics } = useMetricsStore();

  // Fetch real NFT data from contract
  const { details, isLoading, refetch: refetchNftData } = useNFTOnChain();

  // Hooks for score updates
  const { commitUpdate } = useUpdateScore();
  const { update, isUpdating: isUpdatingReputation } = useReputation();

  // Only allow update if updatedScore is higher than currentScore
  const canUpdate = updatedScore !== null && updatedScore > currentScore;

  // Show loading state or return if no NFT data and not loading
  if (!hasNFT || !account || (!details && !isLoading)) return null;
  if (!details) return null;

  // Calculate level from score using shared function
  const levelData = getLevelByScore(details.score);

  // Extract actual image URL from tokenUri (handles base64-encoded JSON)
  const nftUri = extractImageFromTokenUri(details.tokenUri);
  const nftUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${nftUri}`;
  // Get block explorer URL from account store
  const explorerUrl = `${process.env.NEXT_PUBLIC_BLOCKEXPLORER_URL}${account.mintTx}`;

  // Handle update button click
  const handleUpdateClick = async () => {
    if (!canUpdate || !currentMetrics || !updatedMetrics) return;
    try {
      await update(updatedScore!, currentScore, currentMetrics, updatedMetrics, details.tokenUri);
      // After successful on-chain update, commit to local state
      commitUpdate();

      // Refetch NFT data from contract to get updated score and tokenUri
      refetchNftData();
    } catch (error) {
      console.error("Failed to update reputation:", error);
    }
  };

  // Handle share button click - opens X/Twitter with credential share URL
  const handleShareClick = () => {
    if (!account) return;

    const tweetText = `I just earned a MegaScore of ${details.score} on @MegaETH! 🚀 My reputation is now Level #${levelData.level}. Join me in building on MegaETH! 🏆 #Web3 #MegaETH`;

    // Create credential URL - page will fetch data from database and blockchain
    const credentialUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/credential/${account.walletAddress}`;

    // Share on Twitter with the credential page URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(credentialUrl)}&hashtags=Web3,MegaETH,Reputation`;

    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>
      <CardContent className="p-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column: NFT Visual from tokenUri */}
          <div className="flex justify-center">
            <div className="relative flex h-auto w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-mega-coral via-mega-pink to-mega-blue p-6 text-white">
              {/* Display image from tokenUri if available */}
              {nftUri ? (
                <Image
                  src={nftUrl}
                  alt="NFT Metadata"
                  className="h-full w-full object-cover"
                  width={300}
                  height={400}
                />
              ) : (
                <>
                  {/* Fallback Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute left-3 top-3 h-8 w-8 rounded-full border-2 border-white" />
                    <div className="absolute bottom-3 right-3 h-6 w-6 rotate-45 rounded-lg border-2 border-white" />
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white" />
                  </div>
                  {/* NFT Content */}
                  <div className="z-10 text-center">
                    <div className="mb-2 font-mono text-xs uppercase tracking-wider opacity-80">MEGASCORE</div>
                    <div className="mb-2 font-mono text-4xl font-bold">{details.score}</div>
                    <div className="mb-2 text-sm uppercase tracking-wide">Reputation Score</div>
                    <div className="mb-4 font-mono text-xs opacity-60">Level {levelData.level}</div>
                    <div className="font-mono text-xs opacity-60">#{details.tokenId}</div>
                  </div>
                  {/* MegaETH Logo */}
                  <div className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-wider opacity-60">
                    MegaETH
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Details and Actions */}
          <div className="space-y-6">
            {/* NFT Details Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase tracking-wide text-foreground">NFT Details</h3>
              <div className="space-y-2 rounded-lg bg-foreground/5 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Token ID</span>
                  <span className="font-mono font-semibold">#{details.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Score</span>
                  <span className="font-mono font-semibold">{details.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Level</span>
                  <span className="font-mono font-semibold">{levelData.level}</span>
                </div>
              </div>
              <Badge className="inline-flex bg-mega-pink px-3 py-1 text-sm text-white">
                <Hash className="mr-2 h-4 w-4" />
                Soulbound NFT
              </Badge>
            </div>

            {/* Actions Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase tracking-wide text-foreground">Actions</h3>
              <div className="space-y-2">
                {/* Update Button */}
                {canUpdate ? (
                  <Button
                    onClick={handleUpdateClick}
                    disabled={isUpdatingReputation}
                    variant="default"
                    className="w-full uppercase tracking-wide"
                  >
                    {isUpdatingReputation ? (
                      <>
                        <Hash className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Hash className="mr-2 h-4 w-4" />
                        Update SBT
                      </>
                    )}
                  </Button>
                ) : (
                  <Button disabled variant="secondary" className="w-full uppercase tracking-wide">
                    <Hash className="mr-2 h-4 w-4" />
                    Update SBT
                  </Button>
                )}
                <p className="text-center text-xs text-foreground/60">
                  {canUpdate ? "Ready to update SBT" : "Update score to enable SBT actions"}
                </p>

                {/* Secondary Actions */}
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleShareClick} variant="secondary" className="flex-1 uppercase tracking-wide">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  {explorerUrl ? (
                    <Button asChild variant="outline" className="flex-1 uppercase tracking-wide">
                      <Link href={explorerUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        Explorer
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="flex-1 uppercase tracking-wide">
                      <Eye className="mr-2 h-4 w-4" />
                      Explorer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
