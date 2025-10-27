import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Database, Link2, Lock, Shield, Zap } from "lucide-react";

const techDetails = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Real-Time Updates",
    description: "Score calculations happen instantly as you interact with the network",
    color: "bg-mega-coral/5 border-mega-coral/20",
    textColor: "text-mega-coral",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Soulbound NFTs",
    description: "Non-transferable NFT badges permanently record your reputation",
    color: "bg-mega-blue/5 border-mega-blue/20",
    textColor: "text-mega-blue",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "On-Chain Verified",
    description: "All scores are verified and stored on the MegaETH blockchain",
    color: "bg-mega-green/5 border-mega-green/20",
    textColor: "text-mega-green",
  },
  {
    icon: <Link2 className="h-5 w-5" />,
    title: "Smart Contracts",
    description: "Automated scoring through transparent, audited smart contracts",
    color: "bg-mega-pink/5 border-mega-pink/20",
    textColor: "text-mega-pink",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Transparent Analytics",
    description: "Track your progress with detailed metrics and historical data",
    color: "bg-mega-yellow/5 border-mega-yellow/20",
    textColor: "text-mega-yellow",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Security First",
    description: "Enterprise-grade security with multi-signature governance",
    color: "bg-mega-blue/5 border-mega-blue/20",
    textColor: "text-mega-blue",
  },
];

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
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-foreground/80">
            MegaScore is built on MegaETH's high-performance blockchain infrastructure, ensuring real-time score
            updates, minimal gas costs, and transparent, auditable scoring mechanisms.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techDetails.map((detail, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 ${detail.color} p-4 transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`mb-3 ${detail.textColor}`}>{detail.icon}</div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-foreground">{detail.title}</h4>
              <p className="text-xs text-foreground/70">{detail.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-foreground/10 bg-foreground/5 p-4">
          <p className="text-sm text-foreground/80">
            <span className="font-semibold">Stack:</span> MegaETH L2 • Supabase • Real-time Indexing • Smart Contracts
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
