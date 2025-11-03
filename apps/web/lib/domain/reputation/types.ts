export interface MetricScore {
  name: string;
  value: number;
  description: string;
}

export interface ReputationScore {
  totalScore: number;
  level: number;
  breakdown: MetricScore[];
  timestamp: string;
}
