import React from 'react';
import { motion } from 'motion/react';

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export const InfiniteMarquee: React.FC<MarqueeProps> = ({ text, speed = 20, reverse = false, className }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-4 border-brand-dark py-4 bg-brand-primary/10 ${className}`}>
      <motion.div
        animate={{ x: reverse ? [0, -100 + '%'] : [-100 + '%', 0] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-block"
      >
        <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-4">
          {Array(10).fill(text + " ").join(" • ")}
        </span>
      </motion.div>
      <motion.div
        animate={{ x: reverse ? [0, -100 + '%'] : [-100 + '%', 0] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-block"
      >
        <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-4">
          {Array(10).fill(text + " ").join(" • ")}
        </span>
      </motion.div>
    </div>
  );
};
