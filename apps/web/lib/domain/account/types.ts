import { Address } from "@/types/common";

export interface Account {
  id: string;
  walletAddress: Address;
  mintedAt: string;
  createdAt: string;
}
