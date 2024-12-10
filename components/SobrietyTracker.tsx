"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

interface SobrietyTrackerProps {
  date: Date | null;
  onDateSelect: (date: Date) => void;
}

export function SobrietyTracker({ date, onDateSelect }: SobrietyTrackerProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  if (!date) {
    return (
      <Card className="p-6 text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Track Your Recovery Journey</h3>
        <Button
          onClick={() => setShowCalendar(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Set Your Clean Date
        </Button>
      </Card>
    );
  }

  const days = differenceInDays(new Date(), date);

  return (
    <Card className="p-6 text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="space-y-2"
      >
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {days} Days Clean
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          One day at a time
        </p>
      </motion.div>
    </Card>
  );
}