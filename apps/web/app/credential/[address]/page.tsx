import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getLevelByScore } from "@/lib/domain/reputation/level";
import { getNFTDataFromContract } from "@/lib/external/contracts/nft-reader";
import { extractImageFromTokenUri } from "@/lib/utils";
import { Metadata } from "next";

interface SharePageProps {
  params: {
    address: string;
  };
}

// Fetch NFT data directly from smart contract
async function getReputationData(address: string) {
  try {
    const nftData = await getNFTDataFromContract(address);

    if (!nftData) {
      return null;
    }

    return {
      walletAddress: address,
      score: nftData.score,
      tokenUri: nftData.tokenUri,
      tokenId: nftData.tokenId,
    };
  } catch (error) {
    console.error("Error fetching reputation data:", error);
    return null;
  }
}

// Generate metadata for Open Graph
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { address } = await params;

  const reputationData = await getReputationData(address);

  if (!reputationData) {
    return {
      title: "MegaScore Credential",
      description: "Check out this MegaScore reputation credential on MegaETH",
    };
  }

  const { score, tokenUri } = reputationData;
  const levelData = getLevelByScore(score);
  const nftUri = extractImageFromTokenUri(tokenUri);
  const nftImageUrl = nftUri ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${nftUri}` : "";

  return {
    title: `MegaScore ${score} - ${address.slice(0, 6)}...${address.slice(-4)}`,
    description: `Check out my MegaScore reputation on MegaETH! I earned a score of ${score} points. 🏆 Level #${levelData.level} #Web3 #MegaETH`,
    openGraph: {
      title: `MegaScore ${score} - Reputation Credential`,
      description: `I earned a MegaScore of ${score} on @MegaETH! 🚀 Level #${levelData.level} #Web3 #MegaETH`,
      images: nftImageUrl
        ? [
            {
              url: nftImageUrl,
              width: 1200,
              height: 630,
              alt: `MegaScore ${score} NFT`,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `MegaScore ${score} - MegaETH Reputation`,
      description: `I earned a MegaScore of ${score} on @MegaETH! 🚀 Level #${levelData.level} #Web3 #MegaETH`,
      images: nftImageUrl ? [nftImageUrl] : [],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { address } = await params;

  const reputationData = await getReputationData(address);

  if (!reputationData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-foreground/5 p-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Credential Not Found</h1>
          <p className="text-foreground/60">Unable to load reputation data for this address.</p>
        </div>
      </div>
    );
  }

  const { score, tokenUri, tokenId } = reputationData;
  const levelData = getLevelByScore(score);
  const nftUri = extractImageFromTokenUri(tokenUri);
  const nftUrl = nftUri ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${nftUri}` : "";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl py-12">
        {/* Credential Card */}
        <Card className="overflow-hidden border-2 border-foreground/20 shadow-2xl">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-blue via-mega-green to-mega-coral"></div>

          <CardContent className="p-8">
            <div className="space-y-6 text-center">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold uppercase tracking-wide">MegaScore Credential</h1>
                <p className="text-foreground/60">Decentralized Reputation on MegaETH</p>
              </div>

              {/* NFT Image - Primary Visual */}
              {nftUrl ? (
                <div className="flex justify-center">
                  <div className="relative w-full max-w-sm overflow-hidden rounded-xl border-4 border-mega-coral shadow-2xl">
                    <Image
                      src={nftUrl}
                      alt="MegaScore NFT"
                      width={500}
                      height={500}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="relative flex h-64 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border-4 border-mega-coral bg-gradient-to-br from-mega-coral via-mega-pink to-mega-blue p-6 text-white">
                    <div className="mb-2 font-mono text-xs uppercase tracking-wider opacity-80">MEGASCORE</div>
                    <div className="mb-2 font-mono text-4xl font-bold">{score}</div>
                    <div className="mb-2 text-sm uppercase tracking-wide">Reputation Score</div>
                    <div className="mb-4 font-mono text-xs opacity-60">Level {levelData.level}</div>
                    <div className="font-mono text-xs opacity-60">On-Chain Credential</div>
                  </div>
                </div>
              )}

              {/* Reputation Details */}
              <div className="space-y-4 rounded-lg bg-foreground/5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-wide text-foreground/60">Score</p>
                    <p className="text-3xl font-bold text-mega-green">{score}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-wide text-foreground/60">Level</p>
                    <p className="text-3xl font-bold text-mega-coral">#{levelData.level}</p>
                  </div>
                </div>

                <div className="space-y-1 border-t border-foreground/10 pt-2">
                  <p className="text-sm uppercase tracking-wide text-foreground/60">Token ID</p>
                  <p className="font-mono text-sm text-foreground/70">#{tokenId}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-wide text-foreground/60">Wallet Address</p>
                  <p className="break-all font-mono text-sm text-foreground/70">{address}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className="bg-mega-coral px-4 py-2 text-white">✓ Verified Reputation</Badge>
                <Badge className="bg-mega-blue px-4 py-2 text-white">🏆 MegaETH</Badge>
                <Badge className="bg-mega-green px-4 py-2 text-white">🔗 On-Chain</Badge>
              </div>

              {/* CTA */}
              <div className="space-y-3 border-t border-foreground/10 pt-4">
                <p className="text-sm text-foreground/60">
                  This is a verifiable reputation credential from the MegaETH network
                </p>
                <a
                  href="https://megascore.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-mega-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-mega-blue/90"
                >
                  Mint yours on MegaScore →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-foreground/50">
          <p>This credential is generated from on-chain data and can be verified</p>
          <p className="mt-1">Powered by MegaETH × MegaScore</p>
        </div>
      </div>
    </div>
  );
}
