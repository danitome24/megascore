import abi from "@/abi/MegaScore.abi.json";
import { Contract } from "@/lib/domain/shared/types";
import { getAddressesForChain } from "@/lib/external/chains/addresses";

export function getMegaScoreContract(chainId: number): Contract {
  return {
    address: getAddressesForChain(chainId).MegaScore,
    abi,
  };
}
