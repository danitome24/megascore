import { getPublicClient } from "@/lib/external/chains/client";
import { getMegaScoreContract } from "@/lib/external/contracts/megascore-contract";
import { hardhat } from "viem/chains";

/**
 * Fetch NFT data from smart contract given an address
 * @param address Wallet address
 * @returns Object with tokenId, score, and tokenUri or null if no NFT
 */
export async function getNFTDataFromContract(address: string) {
  try {
    const contract = getMegaScoreContract(hardhat.id);

    const client = getPublicClient();

    // Get token ID for the address
    const tokenId = (await client.readContract({
      address: contract.address as `0x${string}`,
      abi: contract.abi,
      functionName: "getTokenIdByAddress",
      args: [address as `0x${string}`],
    })) as bigint;

    // If tokenId is 0, user hasn't minted yet
    if (tokenId === BigInt(0)) {
      return null;
    }

    // Get token URI from contract
    const tokenUri = (await client.readContract({
      address: contract.address as `0x${string}`,
      abi: contract.abi,
      functionName: "tokenURI",
      args: [tokenId],
    })) as string;

    // Get score from contract
    const scoreData = (await client.readContract({
      address: contract.address as `0x${string}`,
      abi: contract.abi,
      functionName: "getScoreByAddress",
      args: [address as `0x${string}`],
    })) as { score: bigint; timestamp: bigint };

    return {
      tokenId: Number(tokenId),
      score: Number(scoreData.score),
      tokenUri,
    };
  } catch (error) {
    console.error("Error fetching NFT data from contract:", error);
    return null;
  }
}
