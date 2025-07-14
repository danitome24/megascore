import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, BarChart3, Users, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
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
                  Connect your wallet and start building your on-chain
                  reputation. Every transaction and interaction contributes to
                  your MegaReputation score.
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
                      <span className="uppercase tracking-[0.15em]">
                        2.4K+ Users
                      </span>
                    </div>
                    <div className="w-px h-4 bg-foreground/20"></div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span className="uppercase tracking-[0.15em]">
                        Live Updates
                      </span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
