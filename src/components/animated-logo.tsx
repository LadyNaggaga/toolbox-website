"use client";

import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  size?: number;
}

export function AnimatedLogo({ className = "", size = 32 }: AnimatedLogoProps) {
  const dotRadius = size * 0.16;
  const strokeWidth = size * 0.08;
  
  // Spring animation config for smooth, organic feel
  const springConfig = {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  };

  // Corner dot positions forming a square
  const dots = [
    { x: 25, y: 25 },  // top-left
    { x: 75, y: 25 },  // top-right
    { x: 25, y: 75 },  // bottom-left
    { x: 75, y: 75 },  // bottom-right
  ];

  // Lines connecting the dots (forming a square)
  const lines = [
    { from: 0, to: 1, name: "top" },
    { from: 1, to: 3, name: "right" },
    { from: 3, to: 2, name: "bottom" },
    { from: 2, to: 0, name: "left" },
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      initial="hidden"
      animate="visible"
    >
      {/* Background rounded square */}
      <motion.rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="24"
        className="fill-teal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          ...springConfig,
          delay: 0,
        }}
      />

      {/* Connecting lines */}
      {lines.map((line, index) => {
        const from = dots[line.from];
        const to = dots[line.to];
        return (
          <motion.line
            key={`line-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                delay: 0.5 + index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              },
              opacity: {
                delay: 0.5 + index * 0.1,
                duration: 0.2,
              },
            }}
          />
        );
      })}

      {/* Corner dots */}
      {dots.map((dot, index) => (
        <motion.circle
          key={`dot-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={dotRadius}
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ...springConfig,
            delay: index * 0.1,
          }}
        />
      ))}
    </motion.svg>
  );
}
