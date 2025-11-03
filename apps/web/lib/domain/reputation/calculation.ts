import type { OnChainActivity } from "../metrics/types";
import { linearScore, scoreOrZero, sqrtWeightedScore } from "./formulas";
import { getLevelByScore } from "./level";
import type { MetricScore, ReputationScore } from "./types";

/**
 * Core Metric Weights - ALL metrics use these
 */
const CORE_METRIC_WEIGHTS = {
  transactions: 15,
  weeksActive: 25,
  contractDiversity: 12,
  txTypeVariety: 8,
  deploymentBonus: 30,
  consecutiveWeeks: 20,
  tenure: 10,
};

/**
 * Calculate transaction score with anti-farming
 */
export function calculateTransactionScore(transactions: number): MetricScore {
  const score = sqrtWeightedScore(transactions, 10, CORE_METRIC_WEIGHTS.transactions);

  return {
    name: "Transaction Activity",
    value: Math.min(score, 200),
    description: `${transactions} transactions recorded`,
    formula: `sqrt(${transactions}/10) × ${CORE_METRIC_WEIGHTS.transactions}`,
  };
}

/**
 * Calculate weeks active score
 */
export function calculateWeeksActiveScore(weeksActive: number): MetricScore {
  const score = linearScore(weeksActive, CORE_METRIC_WEIGHTS.weeksActive * 0.48);

  return {
    name: "Weeks Active",
    value: Math.min(score, 240),
    description: `${weeksActive} weeks of activity`,
    formula: `${weeksActive} × (${CORE_METRIC_WEIGHTS.weeksActive} × 0.48)`,
  };
}

/**
 * Contract diversity score
 */
export function calculateContractDiversityScore(uniqueContracts: number): MetricScore {
  const score = sqrtWeightedScore(uniqueContracts, 5, CORE_METRIC_WEIGHTS.contractDiversity);

  return {
    name: "Contract Diversity",
    value: Math.min(score, 100),
    description: `${uniqueContracts} unique contracts interacted with`,
    formula: `sqrt(${uniqueContracts}/5) × ${CORE_METRIC_WEIGHTS.contractDiversity}`,
  };
}

/**
 * Transaction type variety
 */
export function calculateTxTypeVarietyScore(txTypes: number): MetricScore {
  const score = linearScore(txTypes, CORE_METRIC_WEIGHTS.txTypeVariety * 2.67);

  return {
    name: "Transaction Variety",
    value: Math.min(score, 15),
    description: `${txTypes} different transaction types used`,
    formula: `${txTypes} × (${CORE_METRIC_WEIGHTS.txTypeVariety} × 2.67)`,
  };
}

/**
 * Deployment achievement bonus
 */
export function calculateDeploymentScore(hasDeployed: boolean, deploymentCount: number): MetricScore {
  const baseBonus = scoreOrZero(hasDeployed, 50);
  const countBonus = sqrtWeightedScore(deploymentCount, 2, CORE_METRIC_WEIGHTS.deploymentBonus);

  const score = baseBonus + countBonus;

  return {
    name: "Developer Activity",
    value: Math.min(score, 150),
    description: `${deploymentCount} smart contract${deploymentCount !== 1 ? "s" : ""} deployed`,
    formula: `50 (base) + sqrt(${deploymentCount}/2) × ${CORE_METRIC_WEIGHTS.deploymentBonus}`,
  };
}

/**
 * Consecutive active weeks
 */
export function calculateConsecutiveWeeksScore(maxConsecutiveWeeks: number): MetricScore {
  const score = linearScore(maxConsecutiveWeeks, CORE_METRIC_WEIGHTS.consecutiveWeeks * 0.77);

  return {
    name: "Sustained Engagement",
    value: Math.min(score, 150),
    description: `${maxConsecutiveWeeks} consecutive active weeks`,
    formula: `${maxConsecutiveWeeks} × (${CORE_METRIC_WEIGHTS.consecutiveWeeks} × 0.77)`,
  };
}

/**
 * Tenure score
 */
export function calculateTenureScore(weeksSinceFirst: number): MetricScore {
  const score = linearScore(weeksSinceFirst, CORE_METRIC_WEIGHTS.tenure * 0.1);

  return {
    name: "Tenure",
    value: Math.min(score, 100),
    description: `Active for ${weeksSinceFirst} weeks since first transaction`,
    formula: `${weeksSinceFirst} × (${CORE_METRIC_WEIGHTS.tenure} × 0.1)`,
  };
}

/**
 * Calculate total reputation score
 */
export function calculateTotalScore(breakdown: MetricScore[]): number {
  return breakdown.reduce((total, metric) => total + metric.value, 0);
}

/**
 * Generate complete reputation score
 */
export function generateReputationScore(metrics: OnChainActivity): ReputationScore {
  const breakdown: MetricScore[] = [
    calculateTransactionScore(metrics.transactions),
    calculateWeeksActiveScore(metrics.weeksActive),
    calculateContractDiversityScore(metrics.uniqueContractsInteractedWith),
    calculateTxTypeVarietyScore(metrics.txTypesUsed),
    calculateDeploymentScore(metrics.hasDeployedContract, metrics.contractsDeployedCount),
    calculateConsecutiveWeeksScore(metrics.maxConsecutiveActiveWeeks),
    calculateTenureScore(metrics.weeksSinceFirstTransaction),
  ];

  const totalScore = calculateTotalScore(breakdown);
  const level = getLevelByScore(totalScore);

  return {
    totalScore,
    level: level.level,
    breakdown,
    timestamp: new Date().toISOString(),
  };
}
