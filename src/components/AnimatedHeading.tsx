import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
  className = ""
}: AnimatedHeadingProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const lines = text.split('\n');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Pre-calculate cumulative offsets for accurate character-by-character delay
  let cumulativeChars = 0;
  const lineOffsets = lines.map(line => {
    const offset = cumulativeChars;
    cumulativeChars += line.length;
    return offset;
  });

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block leading-tight">
          {line.split('').map((char, charIndex) => {
            // Using the requested formula logic but mapping it to actual cumulative index
            // to ensure it is character-by-character as stated.
            const globalIndex = lineOffsets[lineIndex] + charIndex;
            const delay = globalIndex * charDelay;
            
            return (
              <span
                key={charIndex}
                className="inline-block transition-all"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${delay}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}
