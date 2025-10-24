"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Wallet } from "lucide-react";
import { useAccount } from "wagmi";

interface ConnectOverlayProps {
  children: React.ReactNode;
}

export function ConnectOverlay({ children }: ConnectOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const { status, isConnected } = useAccount();

  useEffect(() => {
    if (status === "connecting" || status === "reconnecting") {
      return;
    }

    setShowOverlay(!isConnected);
  }, [isConnected, status]);

  if (!showOverlay) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Faded background content */}
      <div className="pointer-events-none select-none opacity-20 blur-sm">{children}</div>

      {/* Connect overlay */}
      <div className="absolute inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <Card className="border-2 border-mega-coral/30 bg-background/95 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              {/* Main Icon */}
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mega-coral/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <Wallet className="h-8 w-8 text-mega-coral" />
              </motion.div>

              {/* Title */}
              <motion.h2
                className="mb-3 text-2xl font-bold uppercase tracking-[0.1em] text-foreground md:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Connect Your Wallet
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-foreground/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Connect your wallet to view your MegaScore, track your on-chain reputation, and access your Soulbound
                NFT.
              </motion.p>

              {/* Features */}
              <motion.div
                className="mb-6 grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-col items-center rounded-lg border border-mega-blue/20 bg-mega-blue/5 p-3">
                  <TrendingUp className="mb-2 h-5 w-5 text-mega-blue" />
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">Track Progress</h3>
                  <p className="text-center text-[10px] leading-tight text-foreground/60">Monitor your activity</p>
                </div>

                <div className="flex flex-col items-center rounded-lg border border-mega-coral/20 bg-mega-coral/5 p-3">
                  <Shield className="mb-2 h-5 w-5 text-mega-coral" />
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">Soulbound NFT</h3>
                  <p className="text-center text-[10px] leading-tight text-foreground/60">Verifiable reputation</p>
                </div>

                <div className="flex flex-col items-center rounded-lg border border-mega-green/20 bg-mega-green/5 p-3">
                  <Wallet className="mb-2 h-5 w-5 text-mega-green" />
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground">Secure Access</h3>
                  <p className="text-center text-[10px] leading-tight text-foreground/60">Safe authentication</p>
                </div>
              </motion.div>

              {/* Connect Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <ConnectKitButton.Custom>
                  {({ show, isConnecting }) => (
                    <motion.button
                      onClick={show}
                      disabled={isConnecting}
                      className="mx-auto flex items-center gap-2 rounded-none border-2 border-mega-coral/50 bg-mega-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:border-mega-coral hover:bg-mega-coral/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Wallet size={16} />
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </motion.button>
                  )}
                </ConnectKitButton.Custom>
              </motion.div>

              {/* Bottom note */}
              <motion.p
                className="mx-auto mt-4 max-w-xs text-[10px] leading-relaxed text-foreground/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                By connecting your wallet, you agree to our terms of service. Your wallet information is never stored on
                our servers.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
