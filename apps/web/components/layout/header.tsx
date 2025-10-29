"use client";

import { HeaderBalanceDisplay } from "@/components/layout/header-balance-display";
import { Address } from "@/lib/domain/shared/types";
import { getAddressesForChain } from "@/lib/external/chains/addresses";
import { useAccount, useBalance, useChainId } from "wagmi";

export function Header() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  return (
    <header className="sticky top-0 z-40 border-b border-mega-coral/20 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-full items-center justify-end px-8">
        {isConnected ? (
          <>
            {/* Balance Display - Transparent Modern Style */}
            <HeaderBalanceDisplay address={address as Address} />
          </>
        ) : (
          <span className="text-xs font-light uppercase tracking-widest text-foreground/30">Wallet Not Connected</span>
        )}
      </div>
    </header>
  );
}
