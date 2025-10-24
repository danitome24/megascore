import { useEffect, useState } from "react";

/**
 * Custom hook to animate a number from start to end value
 * @param start Starting number
 * @param end Ending number
 * @param duration Duration in milliseconds
 * @param isAnimating Whether to trigger the animation
 */
export function useCounterAnimation(start: number, end: number, duration: number = 1500, isAnimating: boolean = false) {
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (!isAnimating || start === end) {
      setDisplayValue(end);
      return;
    }

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out-cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easeProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAnimating, start, end, duration]);

  return displayValue;
}
