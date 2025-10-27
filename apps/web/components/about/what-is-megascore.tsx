import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target } from "lucide-react";

export function WhatIsMegaScore() {
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Target className="mr-3 h-6 w-6 text-mega-coral" />
          What is MegaScore?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-foreground/90">
            MegaScore is a revolutionary merit-based reputation system built for the MegaETH blockchain ecosystem.
          </p>
          <p className="text-foreground/80">
            Unlike traditional reputation systems, MegaScore measures what truly matters: your genuine on-chain activity
            and contributions to the MegaETH network. Every transaction, smart contract interaction, and network
            participation earns you points that accumulate into your MegaReputation Score.
          </p>
          <p className="text-foreground/80">
            Your score is more than just a number—it's proof of your commitment to the MegaETH ecosystem. Unlock
            exclusive opportunities, gain community recognition, and become part of a verified network of pioneers.
          </p>
        </div>
        <div className="flex items-start space-x-4 rounded-lg border border-mega-coral/20 bg-mega-coral/5 p-4">
          <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-mega-coral" />
          <p className="text-sm text-foreground/80">
            <span className="font-bold text-mega-coral">Transparent & Permanent:</span> Every score is permanently
            recorded on-chain as a soulbound NFT badge, creating an immutable record of your MegaETH reputation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
