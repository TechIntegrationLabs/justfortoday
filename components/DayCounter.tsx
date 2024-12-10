"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import confetti from "canvas-confetti";
import { SobrietyCoin } from "./SobrietyCoin";

interface DayCounterProps {
  sobrietyDate: Date;
}

export function DayCounter({ sobrietyDate }: DayCounterProps) {
  const [count, setCount] = useState(0);
  const totalDays = differenceInDays(new Date(), sobrietyDate);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * totalDays);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(updateCount);
  }, [totalDays]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 sm:mb-8"
    >
      <SobrietyCoin days={count} />
    </motion.div>
  );
}