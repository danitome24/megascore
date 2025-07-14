import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarConnectButtonProps {
  isExpanded: boolean;
}

export function SidebarConnectButton({
  isExpanded,
}: SidebarConnectButtonProps) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        const displayText = isConnected
          ? ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : isConnecting
          ? "Connecting..."
          : "Connect Wallet";

        return (
          <motion.button
            onClick={show}
            className={`
              relative w-full h-12 flex items-center justify-center
              transition-all duration-300 ease-out
              border-2 rounded-none outline-none cursor-pointer
              font-medium tracking-widest select-none
              ${
                isConnected
                  ? "bg-mega-blue border-mega-blue/30 text-white hover:bg-mega-blue/90 hover:border-mega-blue/50"
                  : "bg-mega-coral border-mega-coral/30 text-white hover:bg-mega-coral/90 hover:border-mega-coral/50"
              }
              ${
                isExpanded
                  ? "px-4 text-xs shadow-lg"
                  : "px-2 text-[10px] shadow-md"
              }
            `}
            whileHover={{
              scale: isExpanded ? 1.02 : 1.05,
              y: -1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            animate={{
              width: isExpanded ? "100%" : "48px",
            }}
          >
            {/* Wallet Icon */}
            <motion.div
              className="flex-shrink-0"
              animate={{
                marginRight: isExpanded ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <Wallet size={isExpanded ? 14 : 12} />
            </motion.div>

            {/* Text with animation */}
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  key="expanded-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.2,
                    delay: isExpanded ? 0.1 : 0,
                  }}
                  className="truncate uppercase"
                >
                  {displayText}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Connection status indicator */}
            <AnimatePresence>
              {isConnected && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-foreground"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    // Gentle pulse animation
                    boxShadow: [
                      "0 0 0 0 rgba(74, 222, 128, 0.4)",
                      "0 0 0 4px rgba(74, 222, 128, 0)",
                    ],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                    boxShadow: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    },
                  }}
                />
              )}
            </AnimatePresence>

            {/* Loading indicator */}
            <AnimatePresence>
              {isConnecting && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
