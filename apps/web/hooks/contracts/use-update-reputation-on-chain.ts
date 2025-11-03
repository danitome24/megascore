import { useState } from "react";
import { useNftImageGenerator } from "@/hooks/nft/use-nft-image-generator";
import { useSignScore } from "@/hooks/score/use-sign-score";
import { Address, SignedScore } from "@/lib/domain/shared/types";
import { getMegaScoreContract } from "@/lib/external/contracts/megascore-contract";
import { extractImageFromTokenUri } from "@/lib/utils";
import { toast } from "sonner";
import { useAccount, useChainId, usePublicClient, useWriteContract } from "wagmi";

export function useUpdateReputationOnChain() {
  // 1. State hooks
  const [isUpdating, setIsUpdating] = useState(false);

  // 2. External library hooks
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { address: walletAddress } = useAccount();
  const { writeContractAsync: writeContract } = useWriteContract();

  // 3. Contract data
  const { address: contractAddress, abi: contractABI } = getMegaScoreContract(chainId);

  // 4. Custom hooks
  const signScore = useSignScore();
  const { generateAndUpload, deleteOldNftFile } = useNftImageGenerator();

  // 5. Internal functions
  const updateScoreOnChain = async (signedScore: SignedScore, score: number, imageUri: string) => {
    const tx = await writeContract({
      abi: contractABI,
      address: contractAddress as Address,
      functionName: "updateScore",
      args: [
        score,
        imageUri,
        signedScore.signature.v,
        signedScore.signature.r as Address,
        signedScore.signature.s as Address,
      ],
    });

    if (!publicClient) throw new Error("Public client not available");
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx,
      confirmations: 1,
    });

    if (receipt.status === "success") {
      return receipt;
    } else {
      throw new Error("Transaction failed");
    }
  };

  const updateOnChain = async (score: number, existingUri: string): Promise<string> => {
    setIsUpdating(true);
    let toastId: string | number | undefined;
    try {
      if (!walletAddress) throw new Error("Wallet not connected");

      // Step 1: Generate and upload new NFT metadata with updated score
      toastId = toast.loading("Generating new NFT with updated score...");
      const storageUri = await generateAndUpload(score, walletAddress);
      if (!storageUri) throw new Error("Failed to generate NFT metadata");
      toast.success("New NFT metadata generated and uploaded!", { id: toastId });

      // Step 2: Sign the new score
      toastId = toast.loading("Signing your updated score...");
      const signedScore = await signScore(score, walletAddress, chainId, contractAddress as Address);
      toast.success("Score signed!", { id: toastId });

      // Step 3: Update score on-chain with new NFT metadata
      toastId = toast.loading("Updating your reputation on-chain...");
      const receipt = await updateScoreOnChain(signedScore, score, storageUri);
      toast.success("Reputation updated on-chain!", { id: toastId });

      return receipt.transactionHash;
    } catch (error) {
      console.error("Error updating reputation on-chain:", error);
      toast.error("Error updating reputation", {
        description: "An error occurred while updating your reputation on-chain. Please try again.",
        id: toastId,
      });
      throw error;
    } finally {
      // Clean up old NFT file
      const extractedUri = extractImageFromTokenUri(existingUri);
      deleteOldNftFile(extractedUri);
      setIsUpdating(false);
    }
  };

  // 6. Return values
  return { updateOnChain, isUpdating };
}
