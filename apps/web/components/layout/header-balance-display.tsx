"use client";

import { Address } from "@/lib/domain/shared/types";
import { getPaymentTokenContract } from "@/lib/external/contracts/token-contract";
import { motion } from "framer-motion";
import { formatEther } from "viem/utils";
import { useAccount, useBalance, useChainId, useReadContract } from "wagmi";

export function HeaderBalanceDisplay({ address }: { address: Address }) {
  const chainId = useChainId();
  const { data: ethBalance, isLoading: isEthLoading } = useBalance({
    address,
  });
  const { data: tokenBalance, isLoading: isTokenLoading } = useReadContract({
    ...getPaymentTokenContract(chainId),
    functionName: "balanceOf",
    args: [address],
  });

  const ethValue = ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(2) : "0.00";
  const tokenValue = tokenBalance ? parseFloat(formatEther(tokenBalance as bigint)).toFixed(0) : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-8"
    >
      <>
        {/* ETH Balance */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg font-light text-foreground/80 transition-colors hover:text-mega-coral/80">
            {isEthLoading ? "..." : ethValue}
          </span>
          <span className="tracking-wid<er text-xs font-light uppercase text-foreground/40">ETH</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gradient-to-b from-transparent via-mega-coral/20 to-transparent" />

        {/* Payment Token Balance */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg font-light text-foreground/80 transition-colors hover:text-mega-coral/80">
            {isTokenLoading ? "..." : tokenValue}
          </span>
          <span className="text-xs font-light uppercase tracking-wider text-foreground/40">USDT</span>
        </div>

        {/* Connected Address Indicator */}
        <div className="ml-4 h-2 w-2 rounded-full bg-gradient-to-r from-mega-coral to-mega-coral/40 opacity-70" />
      </>
    </motion.div>
  );
}
