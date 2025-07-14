import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, TestTube, Shield } from "lucide-react";
import React from "react";

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "On-Chain Activity Tracking",
    description:
      "Your transactions, contract interactions, and network participation are automatically tracked and scored.",
    color: "text-mega-blue",
  },
  {
    icon: <TestTube className="w-6 h-6" />,
    title: "Testnet Pioneer Rewards",
    description:
      "Early participation in MegaETH testnet activities provides bonus points and special recognition.",
    color: "text-mega-green",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Soulbound NFT",
    description:
      "Your reputation is minted as a non-transferable NFT that evolves with your on-chain journey.",
    color: "text-mega-pink",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Updates",
    description:
      "Your score updates automatically as you interact with the MegaETH network.",
    color: "text-mega-coral",
  },
];

export function KeyFeatures() {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>
      <CardHeader className="border-b border-foreground/10 p-6">
        <CardTitle className="flex items-center text-xl uppercase tracking-wide">
          <Zap className="w-6 h-6 mr-3 text-mega-blue" />
          Key Features
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <div
                className={`${feature.color} p-3 bg-foreground/5 rounded-lg`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold mb-2 text-foreground uppercase tracking-wide text-sm">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
