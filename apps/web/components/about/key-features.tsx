import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, TestTube, Zap } from "lucide-react";

const features = [
  {
    icon: <Activity className="h-6 w-6" />,
    title: "On-Chain Activity Tracking",
    description:
      "Your transactions, contract interactions, and network participation are automatically tracked and scored.",
    color: "text-mega-blue",
  },
  {
    icon: <TestTube className="h-6 w-6" />,
    title: "Testnet Pioneer Rewards",
    description: "Early participation in MegaETH testnet activities provides bonus points and special recognition.",
    color: "text-mega-green",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Soulbound NFT",
    description: "Your reputation is minted as a non-transferable NFT that evolves with your on-chain journey.",
    color: "text-mega-pink",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-Time Updates",
    description: "Your score updates automatically as you interact with the MegaETH network.",
    color: "text-mega-coral",
  },
];

export function KeyFeatures() {
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Zap className="mr-3 h-6 w-6 text-mega-blue" />
          Key Features
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 rounded-lg border border-foreground/10 p-4 transition-colors hover:bg-foreground/5"
            >
              <div className={`${feature.color} rounded-lg bg-foreground/5 p-3`}>{feature.icon}</div>
              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-foreground">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
