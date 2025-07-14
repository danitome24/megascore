import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function TechnicalDetails() {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-blue via-mega-pink to-mega-coral"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Shield className="w-6 h-6 mr-3 text-mega-blue" />
          Technical Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-foreground/80 mb-6">
          MegaScore is built on MegaETH's high-performance blockchain
          infrastructure, ensuring real-time score updates and minimal gas costs
          for score-related transactions.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-coral/5 transition-colors">
            <div className="text-2xl font-bold text-mega-coral mb-2 font-mono">
              Real-time
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Score Updates
            </div>
          </div>
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-blue/5 transition-colors">
            <div className="text-2xl font-bold text-mega-blue mb-2 font-mono">
              Soulbound
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              NFT Technology
            </div>
          </div>
          <div className="text-center p-4 border border-foreground/10 rounded-lg hover:bg-mega-green/5 transition-colors">
            <div className="text-2xl font-bold text-mega-green mb-2 font-mono">
              On-chain
            </div>
            <div className="text-sm text-foreground/70 uppercase tracking-wide">
              Verification
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
