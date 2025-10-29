"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePaymentToken } from "@/hooks/contracts/use-payment-token-balance";
import { BLOCKEXPLORER_CONTRACT_URL } from "@/lib/constants";
import { getAddressesForChain } from "@/lib/external/chains/addresses";
import { Heart } from "lucide-react";
import { useAccount } from "wagmi";
import { useChainId } from "wagmi";

const currentYear = new Date().getFullYear();
const socialLinks = [
  {
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href: "https://github.com/danitome24/megascore",
    label: "GitHub",
  },
];

export function Footer() {
  const chainId = useChainId();
  const contracts = [
    {
      name: "MegaScore",
      address: getAddressesForChain(chainId).MegaScore,
    },
  ];

  const { address } = useAccount();
  const { mintTestTokens, isMinting } = usePaymentToken(address!);

  return (
    <footer className="mt-16 border-t border-foreground/10 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">About MegaScore</h3>
              <p className="text-sm text-foreground/70">
                A decentralized reputation system for the MegaETH network, rewarding genuine on-chain participation.
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-foreground/60">Built with</p>
                <Heart className="h-4 w-4 text-mega-coral" />
                <p className="text-xs text-foreground/60">by meketom</p>
              </div>
            </div>

            {/* Contracts */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Smart Contracts</h3>
              <div className="space-y-3">
                {contracts.map(contract => (
                  <div key={contract.name} className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">{contract.name}</p>
                    <Link
                      href={`${BLOCKEXPLORER_CONTRACT_URL}${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate font-mono text-xs text-foreground/60 transition-colors hover:text-mega-coral"
                    >
                      {contract.address}
                    </Link>
                  </div>
                ))}
              </div>
              <Button size="sm" className="mt-4 w-full" onClick={mintTestTokens} disabled={isMinting || !address}>
                {isMinting ? "Minting..." : "Get Test Tokens"}
              </Button>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Connect</h3>
              <div className="flex items-center space-x-4">
                {socialLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 transition-colors hover:text-mega-coral"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-foreground/10 pt-8">
            <div className="flex items-center justify-center">
              <p className="text-xs text-foreground/60">© {currentYear} MegaScore. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
