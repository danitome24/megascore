import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useScoreStore } from "@/store/score-store";
import { Eye, Hash, Share2 } from "lucide-react";

export function NFTDisplaySection() {
  const { hasNFT, currentScore, updatedScore } = useScoreStore();

  // Use custom hook for score update and commit logic
  const { isUpdating, commitUpdate } = useUpdateScore();

  // Only allow update if updatedScore is higher than currentScore
  const canUpdate = updatedScore !== null && updatedScore > currentScore;

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
            {/* Only show update button if eligible */}
            {canUpdate ? (
              <Button
                onClick={commitUpdate}
                disabled={isUpdating}
                variant="default"
                className="w-full uppercase tracking-wide"
              >
                {isUpdating ? (
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
            <div className="px-2 text-center text-xs text-foreground/60">
              {canUpdate ? "Ready to update SBT" : "Update score to enable SBT actions"}
            </div>
            {/* Secondary Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="secondary" className="flex-1 px-2 py-1 text-xs uppercase tracking-wide">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
              <Button variant="default" className="flex-1 px-2 py-1 text-xs uppercase tracking-wide">
                <Eye className="mr-1 h-3 w-3" />
                Explorer
              </Button>
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
