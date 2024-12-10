"use client";

import { motion } from "framer-motion";

interface SobrietyCoinProps {
  days: number;
}

export function SobrietyCoin({ days }: SobrietyCoinProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-48 h-48 mx-auto"
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 shadow-lg transform-gpu">
        {/* Inner circle */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
          {/* Content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-yellow-900"
            >
              {days}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-medium text-yellow-800 mt-1"
            >
              Days
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Edge detail */}
      <div className="absolute inset-0 rounded-full border-4 border-yellow-500/30" />
    </motion.div>
  );
}