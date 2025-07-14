"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Activity,
  TestTube,
  Trophy,
  Square,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Wallet,
  BarChart3,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-mega-coral/5 via-transparent to-mega-blue/5" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-8 py-4 bg-background border-2 border-mega-coral/30 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Square className="w-4 h-4 mr-4 text-mega-coral fill-mega-coral" />
                <span className="text-sm font-medium text-foreground uppercase tracking-[0.2em]">
                  MegaETH Testnet
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight">
                  Build Your
                  <br />
                  <span className="text-mega-coral">MegaReputation</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Your on-chain activity in the MegaETH ecosystem becomes your verifiable reputation. 
                Connect your wallet to start tracking your testnet participation and network contributions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link href="/my-score">
                  <Button
                    size="lg"
                    className="bg-mega-coral hover:bg-mega-coral/90 text-white border-0 px-12 py-6 uppercase tracking-[0.2em] font-medium text-sm h-auto transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Wallet className="w-5 h-5 mr-4" />
                    Connect & View Score
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-foreground/30 hover:border-mega-blue hover:bg-mega-blue hover:text-white px-12 py-6 bg-transparent uppercase tracking-[0.2em] font-medium text-sm h-auto transition-all duration-300 hover:scale-105"
                  >
                    <TrendingUp className="w-5 h-5 mr-4" />
                    View Leaderboard
                  </Button>
                </Link>
              </motion.div>

              {/* How it Works Cards */}
              <motion.div
                className="grid md:grid-cols-3 gap-8 pt-16 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {[
                  { 
                    icon: Wallet, 
                    title: "Connect Wallet",
                    description: "Link your wallet to start tracking your MegaETH activity",
                    color: "mega-coral"
                  },
                  { 
                    icon: Activity, 
                    title: "Participate & Earn",
                    description: "Use testnet apps, make transactions, and contribute to the ecosystem",
                    color: "mega-blue"
                  },
                  { 
                    icon: Award, 
                    title: "Build Reputation",
                    description: "Watch your reputation score grow as you engage with the network",
                    color: "mega-green"
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                  >
                    <Card className="bg-background border-2 border-foreground/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                      <CardContent className="p-8 text-center space-y-6">
                        <div className={`w-16 h-16 bg-${step.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground uppercase tracking-[0.1em]">
                          {step.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is MegaReputation Section */}
      <section className="relative py-24 border-t border-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mega-blue/2 to-transparent" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
                What is <span className="text-mega-coral">MegaReputation</span>?
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
                A transparent scoring system that tracks your contributions to the MegaETH ecosystem
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Activity,
                  title: "Track Activity",
                  description:
                    "Every transaction, smart contract interaction, and testnet participation is automatically recorded and scored.",
                  color: "mega-coral",
                  delay: 0.2,
                },
                {
                  icon: TestTube,
                  title: "Pioneer Rewards",
                  description:
                    "Early testnet participants receive bonus points and exclusive recognition for helping build the ecosystem.",
                  color: "mega-green",
                  delay: 0.4,
                },
                {
                  icon: Trophy,
                  title: "Verifiable Reputation",
                  description:
                    "Your reputation is stored on-chain as a Soulbound NFT, making it permanent and verifiable across applications.",
                  color: "mega-blue",
                  delay: 0.6,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background border-2 border-foreground/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full hover:-translate-y-2">
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-${feature.color} group-hover:h-2 transition-all duration-300`}
                    ></div>
                    <CardContent className="p-8 h-full flex flex-col">
                      <div
                        className={`w-16 h-16 bg-${feature.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-6`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-4 flex-grow">
                        <h3 className="text-xl font-bold text-foreground uppercase tracking-[0.1em] group-hover:text-mega-coral transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="relative py-24 border-t border-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-mega-green/2 via-transparent to-mega-coral/2" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-[0.1em]">
                MegaETH <span className="text-mega-blue">Testnet</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "2.4K+", label: "Active Users" },
                  { value: "15M+", label: "Transactions" },
                  { value: "98%", label: "Network Uptime" },
                  { value: "24/7", label: "Live Tracking" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 border-2 border-foreground/10 hover:border-mega-coral/30 hover:bg-mega-coral/5 transition-all duration-300 group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.6,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-3 group-hover:text-mega-coral transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60 uppercase tracking-[0.15em] font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-b from-mega-coral/5 via-transparent to-mega-blue/5" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background border-2 border-foreground/20 shadow-2xl overflow-hidden relative hover:shadow-[0_0_60px_rgba(0,0,0,0.3)] transition-all duration-700 group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue group-hover:h-2 transition-all duration-500"></div>
                <CardContent className="p-12 md:p-16 text-center relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground uppercase tracking-[0.1em] group-hover:text-mega-coral transition-colors duration-500">
                      Ready to Start?
                    </h2>
                  </motion.div>

                  <motion.p
                    className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Connect your wallet and start building your on-chain reputation. 
                    Every transaction and interaction contributes to your MegaReputation score.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Link href="/my-score">
                      <Button
                        size="lg"
                        className="bg-mega-coral hover:bg-mega-coral/90 text-white border-0 px-12 py-6 uppercase tracking-[0.2em] font-medium text-sm h-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Wallet className="w-5 h-5 mr-3" />
                        Get My Score
                      </Button>
                    </Link>

                    <Link href="/leaderboard">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-foreground/30 hover:border-mega-blue hover:bg-mega-blue hover:text-white px-12 py-6 bg-transparent uppercase tracking-[0.2em] font-medium text-sm h-auto transition-all duration-300 hover:scale-105"
                      >
                        <BarChart3 className="w-5 h-5 mr-3" />
                        View Rankings
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Simple Social Proof */}
                  <motion.div
                    className="mt-12 pt-8 border-t border-foreground/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-center items-center space-x-8 text-foreground/60 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span className="uppercase tracking-[0.15em]">2.4K+ Users</span>
                      </div>
                      <div className="w-px h-4 bg-foreground/20"></div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span className="uppercase tracking-[0.15em]">Live Updates</span>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
