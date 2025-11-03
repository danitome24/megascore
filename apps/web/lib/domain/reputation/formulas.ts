/**
 * Calculates a weighted score using the square root formula.
 *
 * This is useful for metrics where you want diminishing returns as the value increases.
 * The formula is: Math.sqrt(value / perN) * weight, rounded to the nearest integer.
 *
 * @param value - The raw metric value to score.
 * @param perN - The normalization factor (e.g., per 10, per 100).
 * @param weight - The weight to apply to this metric in the final score.
 * @returns The weighted and normalized score as an integer.
 */
export const sqrtWeightedScore = (value: number, perN: number, weight: number): number => {
  const score = Math.sqrt(value / perN) * weight;
  return Math.round(score);
};

/**
 * Calculates a weighted score using a linear formula.
 *
 * This is useful for metrics where you want a direct proportionality between the value and the score.
 * The formula is: value * weight, rounded to the nearest integer.
 *
 * @param value - The raw metric value to score.
 * @param weight - The weight to apply to this metric in the final score.
 * @returns The weighted score as an integer.
 */
export const linearScore = (value: number, weight: number): number => {
  const score = value * weight;
  return Math.round(score);
};

/**
 * Returns the score if the condition is true, otherwise returns 0.
 *
 * @param condition - If true, the score is returned; if false, returns 0.
 * @param score - The score to return if the condition is true.
 * @returns The score or 0.
 */
export const scoreOrZero = (condition: boolean, score: number): number => {
  return condition ? score : 0;
};

/**
 * Calculates a normalized score based on a base value and a multiplier.
 *
 * This is useful for scaling a raw value to a score range, for example to fit different metrics into a common scale.
 * The formula is: (value / base) * multiplier.
 *
 * @param value - The raw metric value to normalize.
 * @param base - The base value for normalization (e.g., max or reference value).
 * @param multiplier - The factor to scale the normalized value.
 * @returns The normalized and scaled score as a number.
 */
export const normalizedScore = (value: number, base: number, multiplier: number): number => {
  return (value / base) * multiplier;
};
