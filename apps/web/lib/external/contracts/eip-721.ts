import { Address } from "@/lib/domain/shared/types";

export const getEIP712Domain = (chainId: number, verifyingContract: Address) => {
  return {
    name: "MegaScore",
    version: "0.0.1",
    chainId,
    verifyingContract,
  };
};

export const EIP_712_TYPE = {
  Score: [
    { name: "score", type: "uint256" },
    { name: "wallet", type: "address" },
  ],
} as const;
