"use client";

import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";

export function ConnectWalletPrompt() {
  return (
    <div className="mt-14 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mega-coral/10">
            <Wallet className="h-8 w-8 text-mega-coral" />
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider">Connect Your Wallet</h1>
        <p className="mb-8 text-foreground/70">
          Connect your wallet to view your MegaReputation, track your on-chain reputation, and access your Soulbound
          NFT.
        </p>

        <ConnectKitButton.Custom>
          {({ show, isConnecting }) => (
            <button
              onClick={show}
              disabled={isConnecting}
              className="mx-auto flex items-center gap-2 rounded-none border-2 border-mega-coral/50 bg-mega-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:border-mega-coral hover:bg-mega-coral/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Wallet size={16} />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
}
