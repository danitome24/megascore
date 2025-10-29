import { useState } from "react";
import { getPaymentTokenContract } from "@/lib/external/contracts/token-contract";
import { toast } from "sonner";
import { useAccount, useChainId, useWriteContract } from "wagmi";
import { usePublicClient } from "wagmi";

export function useGetTestTokens() {
  const [isLoading, setIsLoading] = useState(false);
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const { address } = useAccount();
  const { writeContractAsync: requestTestTokens } = useWriteContract();

  const getTestTokens = async () => {
    if (!address) {
      toast.error("Please connect your wallet to receive test tokens.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Minting test tokens...");

    try {
      const txHash = await requestTestTokens({
        ...getPaymentTokenContract(chainId),
        functionName: "mint",
        args: [address, BigInt("1000000000000000000")],
      });

      if (txHash && publicClient) {
        toast.loading("Waiting for transaction confirmation...", { id: toastId });
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
          confirmations: 1,
        });
        if (receipt.status === "success") {
          toast.success("✓ Test tokens minted successfully!", { id: toastId });
        } else {
          toast.error("Transaction failed or was reverted.", { id: toastId });
        }
      }
    } catch (error) {
      console.error("Failed to mint tokens:", error);
      toast.error("Failed to mint test tokens. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return { getTestTokens, isLoading };
}
