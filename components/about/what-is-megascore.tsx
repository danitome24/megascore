import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

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
      <CardContent className="space-y-4 p-6">
        <p className="text-foreground/80">
          MegaScore is a comprehensive reputation system designed specifically for the MegaETH blockchain. Unlike
          traditional social reputation systems, MegaScore focuses exclusively on on-chain activity and network
          participation.
        </p>
        <p className="text-foreground/80">
          Your score reflects your genuine engagement with the MegaETH ecosystem, from simple transactions to complex
          smart contract interactions and early testnet participation. This creates a merit-based system that rewards
          actual network usage and contribution.
        </p>
      </CardContent>
    </Card>
  );
}
