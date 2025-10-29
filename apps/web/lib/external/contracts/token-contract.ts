import abi from "@/abi/TestToken.abi.json";
import { Contract } from "@/lib/domain/shared/types";
import { getAddressesForChain } from "@/lib/external/chains/addresses";

export function getPaymentTokenContract(chainId: number): Contract {
  const addresses = getAddressesForChain(chainId);
  return {
    address: addresses.TestToken,
    abi,
  };
}
