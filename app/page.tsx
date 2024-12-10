"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "@/components/DatePicker";
import { DayCounter } from "@/components/DayCounter";
import { DailyQuote } from "@/components/DailyQuote";
import { JournalEntry } from "@/components/JournalEntry";
import { ReflectionPrompt } from "@/components/ReflectionPrompt";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { debug } from "@/lib/debug";

export default function Home() {
  const [sobrietyDate, setSobrietyDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showJournal, setShowJournal] = useState(false);

  debug.log('Home', 'Rendering Home component', { 
    sobrietyDate, 
    showDatePicker, 
    showJournal 
  });

  return (
    <ErrorBoundary>
      <Background />
      <div className="min-h-screen">
        {showDatePicker ? (
          <DatePicker onDateSelect={(date) => {
            debug.log('Home', 'Date selected', date);
            setSobrietyDate(date);
            setShowDatePicker(false);
          }} />
        ) : (
          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
            <AnimatePresence mode="wait">
              {sobrietyDate && !showJournal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-8"
                >
                  <ErrorBoundary>
                    <DayCounter sobrietyDate={sobrietyDate} />
                  </ErrorBoundary>
                  
                  <ErrorBoundary>
                    <DailyQuote />
                  </ErrorBoundary>
                  
                  <ErrorBoundary>
                    <ReflectionPrompt />
                  </ErrorBoundary>
                  
                  <div className="mt-4 sm:mt-8 text-center px-4">
                    <Button 
                      onClick={() => {
                        debug.log('Home', 'Opening journal');
                        setShowJournal(true);
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Write Today's Reflection
                    </Button>
                  </div>
                </motion.div>
              )}

              {showJournal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 p-3 sm:p-4"
                >
                  <ErrorBoundary>
                    <JournalEntry onClose={() => {
                      debug.log('Home', 'Closing journal');
                      setShowJournal(false);
                    }} />
                  </ErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}