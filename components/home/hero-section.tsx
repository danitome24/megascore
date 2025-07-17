import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Square, Wallet, TrendingUp, Award, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectButton } from "@/components/home/connect-button";
import { useAccount } from "wagmi";

export function HeroSection() {
  const account = useAccount();

  return (
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
              Your on-chain activity in the MegaETH ecosystem becomes your
              verifiable reputation. Connect your wallet to start tracking your
              testnet participation and network contributions.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {account.isConnected ? (
                <Link href="/my-score">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-12 py-6 bg-mega-pink hover:bg-mega-pink
                  text-white uppercase tracking-[0.2em] font-medium text-sm h-auto transition-all duration-300 hover:scale-105"
                  >
                    <TrendingUp className="w-5 h-5 mr-4" />
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
                  description:
                    "Link your wallet to start tracking your MegaETH activity",
                  color: "mega-coral",
                },
                {
                  icon: Activity,
                  title: "Participate & Earn",
                  description:
                    "Use testnet apps, make transactions, and contribute to the ecosystem",
                  color: "mega-blue",
                },
                {
                  icon: Award,
                  title: "Build Reputation",
                  description:
                    "Watch your reputation score grow as you engage with the network",
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
                  <Card className="bg-background border-2 border-foreground/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <CardContent className="p-8 text-center space-y-6">
                      <div
                        className={`w-16 h-16 bg-${step.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
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
  );
}
