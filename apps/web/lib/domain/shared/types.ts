export type Address = `0x${string}`;

export interface LeaderboardAccount {
  address: Address;
  score: number;
  level: number;
}

export interface Contract {
  address: Address;
  abi: Abi;
}

interface AbiInput {
  internalType: string;
  name: string;
  type: string;
}

interface AbiItem {
  type: string;
  name?: string;
  inputs?: AbiInput[];
  outputs?: AbiInput[];
  stateMutability?: string;
  anonymous?: boolean;
}

export type Abi = readonly AbiItem[];
