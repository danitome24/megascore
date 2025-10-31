import { useEffect, useState } from "react";
import { Address } from "@/lib/domain/shared/types";
import { getMegaScoreContract } from "@/lib/external/contracts/megascore-contract";
import { useAccount, useChainId, useReadContract } from "wagmi";

export interface NFTDetails {
  tokenId: string;
  tokenUri: string;
  score: number;
}

interface UseNFTDetailsReturn {
  nftData: NFTDetails | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useNFTDetails(): UseNFTDetailsReturn {
  const { address } = useAccount();
  const chainId = useChainId();

  const [nftData, setNftData] = useState<NFTDetails | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { address: contractAddress, abi: contractABI } = getMegaScoreContract(chainId);

  // Get token ID by address
  const {
    data: tokenId,
    isLoading: isLoadingTokenId,
    refetch: refetchTokenId,
  } = useReadContract({
    address: contractAddress as Address,
    abi: contractABI,
    functionName: "getTokenIdByAddress",
    args: [address],
    query: { enabled: !!address },
  });

  // Fetch token URI
  const {
    data: tokenUri,
    isLoading: isLoadingTokenUri,
    refetch: refetchTokenUri,
  } = useReadContract({
    address: contractAddress as Address,
    abi: contractABI,
    functionName: "tokenURI",
    args: [tokenId],
    query: { enabled: !!tokenId && tokenId !== BigInt(0) },
  });

  // Fetch score by address
  const {
    data: scoreData,
    isLoading: isLoadingScore,
    refetch: refetchScore,
  } = useReadContract({
    address: contractAddress as Address,
    abi: contractABI,
    functionName: "getScoreByAddress",
    args: [address],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (tokenId && tokenId !== BigInt(0) && tokenUri && scoreData) {
      setNftData({
        tokenId: tokenId.toString(),
        tokenUri: tokenUri as string,
        score: Number((scoreData as { score: bigint }).score),
      });
      setError(null);
    } else if (!tokenId || tokenId === BigInt(0)) {
      setNftData(null);
    }
  }, [tokenId, tokenUri, scoreData]);

  const refetch = () => {
    refetchTokenId();
    refetchTokenUri();
    refetchScore();
  };

  return {
    nftData,
    isLoading: isLoadingTokenId || isLoadingTokenUri || isLoadingScore,
    error,
    refetch,
  };
}
