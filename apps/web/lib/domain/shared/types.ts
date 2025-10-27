export type Address = `0x${string}`;

export interface LeaderboardAccount {
  address: Address;
  score: number;
  level: number;
}