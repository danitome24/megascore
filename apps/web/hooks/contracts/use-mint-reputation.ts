import { useState } from "react";
import { Address } from "@/lib/domain/shared/types";
import { getMegaScoreContract } from "@/lib/external/contracts/megascore-contract";
import { toast } from "sonner";
import { useAccount, useChainId, usePublicClient, useWriteContract } from "wagmi";

export function useMintReputation() {
  // 1. State hooks
  const [isMinting, setIsMinting] = useState(false);

  // 2. External library hooks
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync: writeMegaScore } = useWriteContract();
  const publicClient = usePublicClient();

  // 3. Contract data
  const { address: contractAddress, abi: contractABI } = getMegaScoreContract(chainId);

  // 4. Custom hooks (to be implemented)
  // const signScore = useSignScore();
  // const { generateAndUpload } = useNftImageGenerator();

  // 5. Internal functions
  const mintReputationOnChain = async (
    signedScore: any, // TODO: replace with SignedScore type
    ipfsHash: string,
    score: number,
    mintTimestamp: number,
  ) => {
    // Prepare contract call
    const tx = await writeMegaScore({
      abi: contractABI,
      address: contractAddress as Address,
      functionName: "mint",
      args: [
        score,
        ipfsHash,
        signedScore.signature.v,
        signedScore.signature.r as Address,
        signedScore.signature.s as Address,
      ],
    });

    // Wait for transaction confirmation
    if (!publicClient) throw new Error("Public client not available");
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx,
      confirmations: 1,
    });

    if (receipt.status === "success") {
      // TODO: Save to database
      // await addAccount(walletAddress, ...);
      // await addScore(account, score);
      return receipt;
    } else {
      throw new Error("Transaction failed");
    }
  };

  const mintReputation = async (score: number): Promise<void> => {
    setIsMinting(true);
    let toastId: string | number | undefined;
    try {
      if (!walletAddress) throw new Error("Wallet not connected");

      // Step 1: Generate NFT metadata and upload to IPFS
      toastId = toast.loading("Generating your NFT...");
      const now = Date.now();
      // const ipfsHash = await generateAndUpload({
      //   score,
      //   walletAddress,
      //   mintedAt: new Date(now),
      // });
      // if (!ipfsHash) throw new Error("Failed to generate NFT");
      const ipfsHash = "TODO_IPFS_HASH"; // Temporary placeholder
      toast.success("NFT metadata generated and uploaded!", { id: toastId });

      // Step 2: Sign the score for minting
      toastId = toast.loading("Signing your score...");
      // const signedScore = await signScore(now, contractAddress, {
      //   score,
      //   wallet: walletAddress,
      //   chainId,
      //   type: "mint",
      // });
      const signedScore = {
        signature: { v: 0, r: "", s: "" },
      }; // Temporary placeholder
      toast.success("Score signed!", { id: toastId });

      // Step 3: Mint NFT on chain
      toastId = toast.loading("Minting your NFT on-chain...");
      await mintReputationOnChain(signedScore, ipfsHash, score, now);
      toast.success("NFT minted successfully!", { id: toastId });
    } catch (error) {
      console.error("Error minting reputation NFT:", error);
      toast.error("Error minting NFT", {
        description: "An error occurred while minting your NFT. Please try again.",
        id: toastId,
      });
      throw error;
    } finally {
      setIsMinting(false);
    }
  };

  // 6. Return values
  return { mintReputation, isMinting };
}
