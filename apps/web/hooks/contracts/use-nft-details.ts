import { useCallback, useEffect, useState } from "react";
import { getNFTDataFromContract } from "@/lib/external/contracts/nft-reader";
import { useAccount } from "wagmi";

export interface NFTDetails {
  tokenId: number;
  tokenUri: string;
  score: number;
}

interface UseNFTDetailsReturn {
  nftData: NFTDetails | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useNFTDetails(): UseNFTDetailsReturn {
  const { address } = useAccount();

  const [nftData, setNftData] = useState<NFTDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNFTData = useCallback(async () => {
    if (!address) {
      setNftData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getNFTDataFromContract(address);
      setNftData(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch NFT data");
      setError(error);
      setNftData(null);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchNFTData();
  }, [fetchNFTData]);

  return {
    nftData,
    isLoading,
    error,
    refetch: fetchNFTData,
  };
}
