import { stats } from '@/lib/status';
import { useCounter } from '@/hooks/use-counter';

interface StatusProps {
  isVisible: boolean;
}

interface CounterDisplayProps {
  numericValue: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
  className: string;
}

function CounterDisplay({
  numericValue,
  suffix,
  isVisible,
  delay,
  className,
}: CounterDisplayProps) {
  const { count } = useCounter({
    end: numericValue,
    duration: 2000,
    isVisible: isVisible,
    delay: delay,
  });

  return (
    <div className={className}>
      {count}
      {suffix}
    </div>
  );
}

export default function Status({ isVisible }: StatusProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {stats(isVisible).map((stat, index) => {
        // Calculate delay based on the stat's position for staggered animation
        const counterDelay = 200 + index * 150; // Start after 200ms, stagger by 150ms

        return (
          <div key={stat.title} className={stat.containerStyle}>
            <CounterDisplay
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              isVisible={isVisible}
              delay={counterDelay}
              className={stat.titleStyle}
            />
            <p className={stat.descriptionStyle}>{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
}
