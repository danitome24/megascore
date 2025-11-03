import { useCallback, useEffect, useState } from "react";
import { getNFTDataFromContract } from "@/lib/external/contracts/nft-reader";
import { useAccount } from "wagmi";

export interface NFTDetails {
  tokenId: number;
  tokenUri: string;
  score: number;
}

interface UseNFTDetailsReturn {
  details: NFTDetails | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useNFTOnChain(): UseNFTDetailsReturn {
  const { address } = useAccount();

  const [details, setDetails] = useState<NFTDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNFTData = useCallback(async () => {
    if (!address) {
      setDetails(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getNFTDataFromContract(address);
      setDetails(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch NFT data");
      setError(error);
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchNFTData();
  }, [fetchNFTData]);

  return {
    details,
    isLoading,
    error,
    refetch: fetchNFTData,
  };
}
