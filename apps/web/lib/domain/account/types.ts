import { Address } from "@/lib/domain/shared/types";

export interface Account {
  id: string;
  walletAddress: Address;
  mintTx: string;
  mintedAt: string;
  createdAt: string;
}
