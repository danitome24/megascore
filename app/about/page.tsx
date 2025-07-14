import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TestTube,
  Shield,
  Zap,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export default function AboutPage() {
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

  const scoringFactors = [
    {
      category: "Transaction Volume",
      weight: "25%",
      description: "Total value and frequency of transactions",
    },
    {
      category: "Contract Interactions",
      weight: "20%",
      description: "Smart contract usage and complexity",
    },
    {
      category: "Network Consistency",
      weight: "15%",
      description: "Regular activity over time",
    },
    {
      category: "Testnet Participation",
      weight: "25%",
      description: "Early adoption and testing activities",
    },
    {
      category: "Community Engagement",
      weight: "10%",
      description: "Participation in governance and events",
    },
    {
      category: "Longevity Bonus",
      weight: "5%",
      description: "Time since first interaction",
    },
  ];

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
                About MegaScore
              </h1>
              <p className="text-base text-foreground/70">
                Understanding the MegaETH Reputation System
              </p>
            </div>
          </div>

          {/* What is MegaScore */}
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
                MegaScore is a comprehensive reputation system designed
                specifically for the MegaETH blockchain. Unlike traditional
                social reputation systems, MegaScore focuses exclusively on
                on-chain activity and network participation.
              </p>
              <p className="text-foreground/80">
                Your score reflects your genuine engagement with the MegaETH
                ecosystem, from simple transactions to complex smart contract
                interactions and early testnet participation. This creates a
                merit-based system that rewards actual network usage and
                contribution.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
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

          {/* Why MegaScore Matters */}
          <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-pink via-mega-blue to-mega-green"></div>
            <CardHeader className="border-b border-foreground/10 p-6">
              <CardTitle className="flex items-center text-xl uppercase tracking-wide">
                <Users className="w-6 h-6 mr-3 text-mega-pink" />
                Why MegaScore Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-foreground/10 rounded-lg">
                  <h4 className="font-bold mb-3 text-mega-coral uppercase tracking-wide">
                    For Users
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Showcase your MegaETH expertise and commitment</li>
                    <li>• Gain recognition as an early adopter and pioneer</li>
                    <li>• Access to exclusive opportunities and rewards</li>
                    <li>• Portable reputation across MegaETH applications</li>
                  </ul>
                </div>
                <div className="p-4 border border-foreground/10 rounded-lg">
                  <h4 className="font-bold mb-3 text-mega-green uppercase tracking-wide">
                    For the Ecosystem
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Incentivize genuine network participation</li>
                    <li>• Identify and reward valuable community members</li>
                    <li>• Create a merit-based reputation system</li>
                    <li>• Foster long-term ecosystem growth</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
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
                infrastructure, ensuring real-time score updates and minimal gas
                costs for score-related transactions.
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
        </div>
      </div>
    </PageContainer>
  );
}
