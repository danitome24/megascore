"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

interface MintNFTCardProps {
  onMint: () => Promise<void>;
  isLoading?: boolean;
}

export function MintNFTCard({ onMint, isLoading = false }: MintNFTCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
      <Card className="relative overflow-hidden border-2 border-mega-pink/40 bg-gradient-to-br from-mega-pink/5 via-background to-background shadow-lg">
        {/* Background accent */}
        <motion.div
          className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-mega-pink/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <CardContent className="relative p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-mega-pink" />
                <h3 className="text-lg font-bold text-mega-pink">Lock in Your Score</h3>
              </div>
              <p className="text-sm text-foreground/60">
                Mint an exclusive NFT badge to permanently record your reputation on-chain
              </p>
            </div>

            <Button
              onClick={onMint}
              disabled={isLoading}
              size="lg"
              className="h-12 w-full bg-gradient-to-r from-mega-pink to-mega-coral text-base font-semibold shadow-lg transition-all hover:from-mega-pink/90 hover:to-mega-coral/90 hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Sparkles className="mr-3 h-5 w-5 animate-spin" />
                  Minting Your NFT...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5" />
                  Mint NFT Badge
                </>
              )}
            </Button>

            <p className="text-center text-xs text-foreground/40">
              This will initiate a secure transaction to mint your exclusive reputation NFT
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
