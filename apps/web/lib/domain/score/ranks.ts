export interface Rank {
  rank: number;
  minScore: number;
  maxScore: number;
  color: string; // Tailwind or HEX
}

export const RANKS: Rank[] = [
  { rank: 0, minScore: 0, maxScore: 199, color: "bg-mega-blue" },
  { rank: 1, minScore: 200, maxScore: 499, color: "bg-mega-green" },
  { rank: 2, minScore: 500, maxScore: 999, color: "bg-mega-coral" },
  { rank: 3, minScore: 1000, maxScore: 1999, color: "bg-mega-pink" },
  { rank: 4, minScore: 2000, maxScore: 2999, color: "bg-mega-yellow" },
  { rank: 5, minScore: 3000, maxScore: 4999, color: "bg-mega-purple" },
  { rank: 6, minScore: 5000, maxScore: 9999, color: "bg-mega-orange" },
  { rank: 7, minScore: 10000, maxScore: Infinity, color: "bg-mega-black" },
];

export function getRankByScore(score: number): Rank {
  return RANKS.find(r => score >= r.minScore && score <= r.maxScore) ?? RANKS[0];
}

export function getPointsToNextRank(score: number): number | null {
  const currentRank = getRankByScore(score);
  const currentIndex = RANKS.findIndex(r => r.rank === currentRank.rank);
  if (currentIndex === -1 || currentIndex === RANKS.length - 1) {
    // Already at highest rank or not found
    return null;
  }
  const nextRank = RANKS[currentIndex + 1];
  return nextRank.minScore - score;
}
