import { useEffect, useState, useRef } from 'react';

interface UseCounterProps {
  end: number;
  duration?: number;
  isVisible?: boolean;
  delay?: number;
}

export function useCounter({
  end,
  duration = 2000,
  isVisible = false,
  delay = 0,
}: UseCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;

      // Clean up any existing animation first
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        setCount(0); // Reset count to 0 before starting

        let startTime: number | null = null;

        const animate = (currentTime: number) => {
          if (startTime === null) {
            startTime = currentTime;
          }

          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth easing function (ease-out-quart)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeOutQuart * end);

          setCount(currentCount);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            // Animation complete
            setCount(end);
            setIsAnimating(false);
            animationFrameRef.current = null;
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      }, delay);
    }
  }, [isVisible, end, duration, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { count, isAnimating };
}
