import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function TechnicalDetails() {
  return (
    <Card className="relative overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-blue via-mega-pink to-mega-coral"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Shield className="mr-3 h-6 w-6 text-mega-blue" />
          Technical Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-6 text-foreground/80">
          MegaScore is built on MegaETH's high-performance blockchain infrastructure, ensuring real-time score updates
          and minimal gas costs for score-related transactions.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-coral/5">
            <div className="mb-2 font-mono text-2xl font-bold text-mega-coral">Real-time</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Score Updates</div>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-blue/5">
            <div className="mb-2 font-mono text-2xl font-bold text-mega-blue">Soulbound</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">NFT Technology</div>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4 text-center transition-colors hover:bg-mega-green/5">
            <div className="mb-2 font-mono text-2xl font-bold text-mega-green">On-chain</div>
            <div className="text-sm uppercase tracking-wide text-foreground/70">Verification</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
