export interface Score {
  id: string; // uuid
  accountId: string;
  score: number;
  updatedAt: string; // ISO date
}

export interface ScoreHistory {
  id: string; // uuid
  accountId: string;
  score: number;
  recordedAt: string; // ISO date
}
