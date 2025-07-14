import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Eye, Wallet, Hash } from "lucide-react";
import { useMintSBT } from "@/hooks/nft/use-mint-sbt";
import { usePersistScore } from "@/hooks/score/use-persist-score";
import React from "react";

interface NFTDisplayProps {
  hasNFT: boolean;
  nftData: {
    tokenId: string;
    score: number;
    level: number;
    mintDate: string;
    lastUpdate: string;
    attributes: Array<{ trait: string; value: string; rarity: string }>;
  };
  displayScore: number;
}

export function NFTDisplay({ hasNFT, nftData, displayScore }: NFTDisplayProps) {
  // Use custom hook for minting logic
  const {
    isMinting,
    showMintOption,
    scoreIncreased,
    scoreIncrease,
    handleMintSBT,
  } = useMintSBT(displayScore);

  // Use custom hook for persistence logic
  const { isPersisting, showPersistOption, handlePersistScore } =
    usePersistScore(displayScore);

  if (!hasNFT) return null;
  return (
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
              <button
                onClick={handleMintSBT}
                disabled={isMinting}
                className="w-full bg-mega-coral hover:bg-mega-coral/90 text-white border-0 uppercase tracking-wide font-medium"
              >
                {isMinting ? (
                  <>
                    <Wallet className="w-4 h-4 mr-2 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
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
                className="w-full bg-mega-blue hover:bg-mega-blue/90 text-white border-0 uppercase tracking-wide font-medium"
              >
                {isPersisting ? (
                  <>
                    <Hash className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Hash className="w-4 h-4 mr-2" />
                    Update SBT
                  </>
                )}
              </button>
            )}
            {/* Disabled Update Button */}
            {!showPersistOption &&
              !showMintOption &&
              !isMinting &&
              !isPersisting && (
                <button
                  disabled
                  className="w-full bg-foreground/10 text-foreground/50 border-0 uppercase tracking-wide font-medium cursor-not-allowed"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Update SBT
                </button>
              )}
            <div className="text-xs text-foreground/60 text-center px-2">
              {!scoreIncreased
                ? "Update score to enable SBT actions"
                : "Ready to update SBT"}
            </div>
            {/* Secondary Actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 border-mega-blue text-mega-blue hover:bg-mega-blue hover:text-white bg-transparent text-xs border rounded px-2 py-1">
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </button>
              <button className="flex-1 border-mega-green text-mega-green hover:bg-mega-green hover:text-white bg-transparent text-xs border rounded px-2 py-1">
                <Eye className="w-3 h-3 mr-1" />
                Explorer
              </button>
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
                  <span className="text-foreground/70">Last Update</span>
                  <span className="font-mono">{nftData.lastUpdate}</span>
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
  );
}
