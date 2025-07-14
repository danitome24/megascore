import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export function WhatIsMegaScore() {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Target className="w-6 h-6 mr-3 text-mega-coral" />
          What is MegaScore?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-foreground/80">
          MegaScore is a comprehensive reputation system designed specifically
          for the MegaETH blockchain. Unlike traditional social reputation
          systems, MegaScore focuses exclusively on on-chain activity and
          network participation.
        </p>
        <p className="text-foreground/80">
          Your score reflects your genuine engagement with the MegaETH
          ecosystem, from simple transactions to complex smart contract
          interactions and early testnet participation. This creates a
          merit-based system that rewards actual network usage and contribution.
        </p>
      </CardContent>
    </Card>
  );
}
