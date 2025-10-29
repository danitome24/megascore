import { useCallback, useState } from "react";
import { Address } from "@/lib/domain/shared/types";
import { getPaymentTokenContract } from "@/lib/external/contracts/token-contract";
import { toast } from "sonner";
import { useChainId, usePublicClient, useReadContract, useWriteContract } from "wagmi";

export function usePaymentToken(address: Address) {
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const { writeContractAsync: requestTestTokens } = useWriteContract();
  const {
    data: tokenBalance,
    isLoading: isTokenLoading,
    refetch: refetchTokenBalance,
  } = useReadContract({
    ...getPaymentTokenContract(chainId),
    functionName: "balanceOf",
    args: [address],
  });

  const [isMinting, setIsMinting] = useState(false);

  const mintTestTokens = useCallback(async () => {
    if (!address) {
      toast.error("Please connect your wallet to receive test tokens.");
      return;
    }
    setIsMinting(true);
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
          refetchTokenBalance();
        } else {
          toast.error("Transaction failed or was reverted.", { id: toastId });
        }
      }
    } catch (error) {
      console.error("Failed to mint tokens:", error);
      toast.error("Failed to mint test tokens. Please try again.", { id: toastId });
    } finally {
      setIsMinting(false);
    }
  }, [address, chainId, publicClient, requestTestTokens, refetchTokenBalance]);

  return {
    tokenBalance,
    isTokenLoading,
    refetchTokenBalance,
    mintTestTokens,
    isMinting,
  };
}
