"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
}

export function DatePicker({ onDateSelect }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4"
        >
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Begin Your Journey
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your clean date
            </p>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-0"
            classNames={{
              months: "space-y-2",
              month: "space-y-2",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm relative p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md",
              day: "h-8 w-8 p-0 font-normal",
              day_selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
              day_today: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white",
              day_outside: "opacity-50",
              day_disabled: "opacity-50 cursor-not-allowed",
            }}
          />

          <Button
            onClick={() => date && onDateSelect(date)}
            disabled={!date}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Begin
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}