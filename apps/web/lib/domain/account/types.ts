import { Address } from "@/lib/domain/shared/types";

export interface Account {
  id: string;
  walletAddress: Address;
  mintedAt: string;
  createdAt: string;
}
