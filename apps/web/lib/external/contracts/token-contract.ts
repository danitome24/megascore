import abi from "@/abi/TestToken.abi.json";
import { Contract } from "@/lib/domain/shared/types";
import { getAddressesForChain } from "@/lib/external/chains/addresses";

export function getPaymentTokenContract(): Contract {
  const addresses = getAddressesForChain();
  return {
    address: addresses.TestToken,
    abi,
  };
}
