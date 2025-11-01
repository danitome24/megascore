import { useState } from "react";
import { useNftImageGenerator } from "@/hooks/nft/use-nft-image-generator";
import { useSignScore } from "@/hooks/score/use-sign-score";
import { MetricsData } from "@/lib/domain/metrics/types";
import { Address, SignedScore } from "@/lib/domain/shared/types";
import { updateMetrics as updateMetricsAPI } from "@/lib/external/api/metrics";
import { updateScore as updateScoreAPI } from "@/lib/external/api/score";
import { getMegaScoreContract } from "@/lib/external/contracts/megascore-contract";
import { toast } from "sonner";
import { useAccount, useChainId, usePublicClient, useWriteContract } from "wagmi";

interface UpdateReputationParams {
  newScore: number;
  currentScore: number;
  currentMetrics: MetricsData;
  updatedMetrics: MetricsData;
  existingUri: string;
}

export function useUpdateReputation() {
  // 1. State hooks
  const [isUpdating, setIsUpdating] = useState(false);

  // 2. External library hooks
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync: writeContract } = useWriteContract();
  const publicClient = usePublicClient();

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

  const updateReputation = async (params: UpdateReputationParams): Promise<void> => {
    setIsUpdating(true);
    let toastId: string | number | undefined;
    try {
      if (!walletAddress) throw new Error("Wallet not connected");

      // Step 1: Generate and upload new NFT metadata with updated score
      toastId = toast.loading("Generating new NFT with updated score...");
      const storageUri = await generateAndUpload(params.newScore, walletAddress);
      if (!storageUri) throw new Error("Failed to generate NFT metadata");
      console.log("Storage URI:", storageUri);
      toast.success("New NFT metadata generated and uploaded!", { id: toastId });

      // Step 2: Sign the new score
      toastId = toast.loading("Signing your updated score...");
      const signedScore = await signScore(params.newScore, walletAddress, chainId, contractAddress as Address);
      console.log("Signed Score:", signedScore);
      toast.success("Score signed!", { id: toastId });

      // Step 3: Update score on-chain with new NFT metadata
      toastId = toast.loading("Updating your reputation on-chain...");
      await updateScoreOnChain(signedScore, params.newScore, storageUri);
      toast.success("Score updated on-chain!", { id: toastId });

      // Step 4: Update score in API (old score goes to scores_history, new score becomes current)
      toastId = toast.loading("Persisting score update to database...");
      await updateScoreAPI(walletAddress, params.newScore, params.currentScore);

      // Step 5: Update metrics in API if both exist (old metrics goes to metrics_history, new metrics becomes current)
      if (params.currentMetrics && params.updatedMetrics) {
        await updateMetricsAPI(walletAddress, params.updatedMetrics, params.currentMetrics);
      }

      toast.success("Reputation updated!", {
        description: "Your reputation and NFT have been permanently updated",
        id: toastId,
      });
    } catch (error) {
      console.error("Error updating reputation:", error);
      toast.error("Error updating reputation", {
        description: "An error occurred while updating your reputation. Please try again.",
        id: toastId,
      });
      throw error;
    } finally {
      deleteOldNftFile(params.existingUri);
      setIsUpdating(false);
    }
  };

  // 6. Return values
  return { updateReputation, isUpdating };
}
