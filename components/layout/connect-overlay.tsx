import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";
import { Wallet, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConnectOverlayProps {
  children: React.ReactNode;
}

export function ConnectOverlay({ children }: ConnectOverlayProps) {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Faded background content */}
      <div className="opacity-20 blur-sm pointer-events-none select-none">
        {children}
      </div>

      {/* Connect overlay */}
      <div className="absolute inset-0 flex items-start justify-center p-4 pt-20 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <Card className="bg-background/95 backdrop-blur-xl border-2 border-mega-coral/30 shadow-2xl">
            <CardContent className="p-8 text-center">
              {/* Main Icon */}
              <motion.div
                className="w-16 h-16 bg-mega-coral/10 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <Wallet className="w-8 h-8 text-mega-coral" />
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-foreground uppercase tracking-[0.1em] mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Connect Your Wallet
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className="text-sm text-foreground/70 mb-6 leading-relaxed max-w-sm mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Connect your wallet to view your MegaScore, track your on-chain
                reputation, and access your Soulbound NFT.
              </motion.p>

              {/* Features */}
              <motion.div
                className="grid grid-cols-3 gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-col items-center p-3 bg-mega-blue/5 border border-mega-blue/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-mega-blue mb-2" />
                  <h3 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-1">
                    Track Progress
                  </h3>
                  <p className="text-[10px] text-foreground/60 text-center leading-tight">
                    Monitor your activity
                  </p>
                </div>

                <div className="flex flex-col items-center p-3 bg-mega-coral/5 border border-mega-coral/20 rounded-lg">
                  <Shield className="w-5 h-5 text-mega-coral mb-2" />
                  <h3 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-1">
                    Soulbound NFT
                  </h3>
                  <p className="text-[10px] text-foreground/60 text-center leading-tight">
                    Verifiable reputation
                  </p>
                </div>

                <div className="flex flex-col items-center p-3 bg-mega-green/5 border border-mega-green/20 rounded-lg">
                  <Wallet className="w-5 h-5 text-mega-green mb-2" />
                  <h3 className="font-semibold text-foreground text-xs uppercase tracking-wide mb-1">
                    Secure Access
                  </h3>
                  <p className="text-[10px] text-foreground/60 text-center leading-tight">
                    Safe authentication
                  </p>
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
                      className="
                        bg-mega-coral hover:bg-mega-coral/90 
                        text-white font-medium text-sm uppercase tracking-widest
                        px-8 py-3 rounded-none border-2 border-mega-coral/50
                        hover:border-mega-coral transition-all duration-300
                        shadow-lg hover:shadow-xl
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center gap-2 mx-auto
                      "
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
                className="text-[10px] text-foreground/50 mt-4 max-w-xs mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                By connecting your wallet, you agree to our terms of service.
                Your wallet information is never stored on our servers.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
