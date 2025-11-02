"use client";

import Link from "next/link";
import { ConnectButton } from "@/components/home/connect-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Award, Square, TrendingUp, Wallet } from "lucide-react";
import { useAccount } from "wagmi";

export function HeroSection() {
  const account = useAccount();

  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-mega-coral/5 via-transparent to-mega-blue/5" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center border-2 border-mega-coral/30 bg-background px-8 py-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Square className="mr-4 h-4 w-4 fill-mega-coral text-mega-coral" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">MegaETH Testnet</span>
            </motion.div>
            {/* Main Heading */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Build Your
                <br />
                <span className="text-mega-coral">MegaReputation</span>
              </h1>
            </motion.div>
            {/* Description */}
            <motion.p
              className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-foreground/70 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Your on-chain activity in the MegaETH ecosystem becomes your verifiable reputation. Connect your wallet to
              start tracking your testnet participation and network contributions.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col justify-center gap-6 pt-6 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {account.isConnected ? (
                <Link href="/my-score">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-auto bg-mega-pink px-12 py-6 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:bg-mega-pink"
                  >
                    <TrendingUp className="mr-4 h-5 w-5" />
                    View Your Score
                  </Button>
                </Link>
              ) : (
                <ConnectButton />
              )}

              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-auto border-2 border-foreground/30 bg-transparent px-12 py-6 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-mega-blue hover:bg-mega-blue hover:text-white"
                >
                  <TrendingUp className="mr-4 h-5 w-5" />
                  View Leaderboard
                </Button>
              </Link>
            </motion.div>
            {/* How it Works Cards */}
            <motion.div
              className="mx-auto grid max-w-5xl gap-8 pt-16 md:grid-cols-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {[
                {
                  icon: Wallet,
                  title: "Connect Wallet",
                  description: "Link your wallet to start tracking your MegaETH activity",
                  color: "mega-coral",
                },
                {
                  icon: Activity,
                  title: "Participate & Earn",
                  description: "Use testnet apps, make transactions, and contribute to the ecosystem",
                  color: "mega-blue",
                },
                {
                  icon: Award,
                  title: "Build Reputation",
                  description: "Watch your reputation score grow as you engage with the network",
                  color: "mega-green",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                >
                  <Card className="h-full border-2 border-foreground/20 bg-background shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <CardContent className="space-y-6 p-8 text-center">
                      <div
                        className={`h-16 w-16 bg-${step.color} mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-[0.1em] text-foreground">{step.title}</h3>
                      <p className="font-light leading-relaxed text-foreground/70">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
