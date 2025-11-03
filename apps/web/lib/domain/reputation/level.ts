export interface Level {
  level: number;
  minScore: number;
  maxScore: number;
  color: string; // Tailwind or HEX
}

export const LEVELS: Level[] = [
  { level: 1, minScore: 0, maxScore: 199, color: "bg-mega-blue" },
  { level: 2, minScore: 200, maxScore: 499, color: "bg-mega-green" },
  { level: 3, minScore: 500, maxScore: 999, color: "bg-mega-coral" },
  { level: 4, minScore: 1000, maxScore: 1999, color: "bg-mega-pink" },
  { level: 5, minScore: 2000, maxScore: 2999, color: "bg-mega-yellow" },
  { level: 6, minScore: 3000, maxScore: 4999, color: "bg-mega-purple" },
  { level: 7, minScore: 5000, maxScore: 9999, color: "bg-mega-orange" },
  { level: 8, minScore: 10000, maxScore: Infinity, color: "bg-mega-black" },
];

export function getLevelByScore(score: number): Level {
  return LEVELS.find(l => score >= l.minScore && score <= l.maxScore) ?? LEVELS[0];
}

export function getPointsToNextLevel(score: number): number | null {
  const currentLevel = getLevelByScore(score);
  const currentIndex = LEVELS.findIndex(l => l.level === currentLevel.level);
  if (currentIndex === -1 || currentIndex === LEVELS.length - 1) {
    // Already at highest level or not found
    return null;
  }
  const nextLevel = LEVELS[currentIndex + 1];
  return nextLevel.minScore - score;
}
