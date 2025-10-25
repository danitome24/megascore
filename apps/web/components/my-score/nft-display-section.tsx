import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMintSBT } from "@/hooks/nft/use-mint-sbt";
import { usePersistScore } from "@/hooks/score/use-persist-score";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useScoreStore } from "@/lib/store/score-store";
import { Eye, Hash, Share2, Wallet } from "lucide-react";

export function NFTDisplaySection() {
  const { hasNFT, currentScore, updatedScore } = useScoreStore();
  const { displayScore } = useUpdateScore();

  // Use custom hook for minting logic
  const { isMinting, showMintOption, scoreIncreased, scoreIncrease, handleMintSBT } = useMintSBT(displayScore);

  // Use custom hook for persistence logic
  const { isPersisting, showPersistOption, handlePersistScore } = usePersistScore(displayScore);

  // NFT data computed from store
  const nftData = {
    tokenId: String(currentScore),
    score: currentScore,
    level: Math.floor(currentScore / 100),
    mintDate: "2024-03-15",
    lastUpdate: new Date().toISOString().split("T")[0],
    attributes: [
      { trait: "Network Activity", value: "High", rarity: "15%" },
      { trait: "Testnet Pioneer", value: "Yes", rarity: "8%" },
      { trait: "Early Adopter", value: "Genesis", rarity: "3%" },
      { trait: "Consistency", value: "Diamond Hands", rarity: "12%" },
    ],
  };

  if (!hasNFT) return null;
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>
      <CardContent className="p-6">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* Columna 1: NFT Visual */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-mega-coral via-mega-pink to-mega-blue p-6 text-white">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute left-3 top-3 h-8 w-8 rounded-full border-2 border-white" />
                <div className="absolute bottom-3 right-3 h-6 w-6 rotate-45 rounded-lg border-2 border-white" />
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white" />
              </div>
              {/* NFT Content */}
              <div className="z-10 text-center">
                <div className="mb-2 font-mono text-xs uppercase tracking-wider opacity-80">MEGASCORE NFT</div>
                <div className="mb-2 font-mono text-3xl font-bold">{nftData.score}</div>
                <div className="mb-2 text-sm uppercase tracking-wide">Level {nftData.level}</div>
                <div className="font-mono text-xs opacity-60">#{nftData.tokenId}</div>
              </div>
              {/* MegaETH Logo */}
              <div className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-wider opacity-60">
                MegaETH
              </div>
            </div>
          </div>
          {/* Columna 2: SBT Actions principales */}
          <div className="space-y-4">
            {/* SBT Action Alert */}
            {scoreIncreased && !isMinting && !isPersisting && (
              <div className="rounded-lg border border-mega-green/20 bg-mega-green/10 p-3">
                <div className="text-center">
                  <div className="mb-1 text-sm font-bold text-mega-green">Score +{scoreIncrease}!</div>
                  <div className="text-xs text-foreground/70">{hasNFT ? "Update SBT" : "Mint first SBT"}</div>
                </div>
              </div>
            )}
            {/* Mint Button */}
            {showMintOption && (
              <button
                onClick={handleMintSBT}
                disabled={isMinting}
                className="w-full border-0 bg-mega-coral font-medium uppercase tracking-wide text-white hover:bg-mega-coral/90"
              >
                {isMinting ? (
                  <>
                    <Wallet className="mr-2 h-4 w-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Mint SBT
                  </>
                )}
              </button>
            )}
            {/* Update Button */}
            {showPersistOption && (
              <button
                onClick={handlePersistScore}
                disabled={isPersisting}
                className="w-full border-0 bg-mega-blue font-medium uppercase tracking-wide text-white hover:bg-mega-blue/90"
              >
                {isPersisting ? (
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
              </button>
            )}
            {/* Disabled Update Button */}
            {!showPersistOption && !showMintOption && !isMinting && !isPersisting && (
              <button
                disabled
                className="w-full cursor-not-allowed border-0 bg-foreground/10 font-medium uppercase tracking-wide text-foreground/50"
              >
                <Hash className="mr-2 h-4 w-4" />
                Update SBT
              </button>
            )}
            <div className="px-2 text-center text-xs text-foreground/60">
              {!scoreIncreased ? "Update score to enable SBT actions" : "Ready to update SBT"}
            </div>
            {/* Secondary Actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 rounded border border-mega-blue bg-transparent px-2 py-1 text-xs text-mega-blue hover:bg-mega-blue hover:text-white">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </button>
              <button className="flex-1 rounded border border-mega-green bg-transparent px-2 py-1 text-xs text-mega-green hover:bg-mega-green hover:text-white">
                <Eye className="mr-1 h-3 w-3" />
                Explorer
              </button>
            </div>
          </div>
          {/* Columna 3: NFT Details */}
          <div className="space-y-4">
            <div>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-foreground">NFT Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Token ID</span>
                  <span className="font-mono">#{nftData.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Level</span>
                  <span className="font-bold text-mega-blue">{nftData.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Minted</span>
                  <span className="font-mono">{nftData.mintDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Last Update</span>
                  <span className="font-mono">{nftData.lastUpdate}</span>
                </div>
              </div>
              <Badge className="mt-3 bg-mega-pink px-3 py-1 text-sm text-white">
                <Hash className="mr-2 h-4 w-4" />
                Soulbound NFT
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
