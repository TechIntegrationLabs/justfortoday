"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

interface HeaderProps {
  date: Date;
}

export function Header({ date }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {format(date, "MMMM dd, yyyy")}
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Listening
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Page 359
      </p>
    </motion.header>
  );
}