"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { quotesDatabase } from "@/lib/quotes-database";
import { GuidedMeditation } from "@/components/GuidedMeditation";
import { debug } from "@/lib/debug";
import type { Quote } from "@/lib/types/quotes";

const getDailyQuoteKey = () => {
  const today = new Date();
  return `daily-quote-${today.toISOString().split('T')[0]}`;
};

export function DailyQuote() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const quoteKey = getDailyQuoteKey();
      const savedQuote = localStorage.getItem(quoteKey);
      
      if (savedQuote) {
        debug.log('DailyQuote', 'Retrieved saved quote for today', savedQuote);
        setCurrentQuote(JSON.parse(savedQuote));
      } else {
        const newQuote = quotesDatabase.getRandomQuote({ source: 'na-book' });
        debug.log('DailyQuote', 'Generated new quote for today', newQuote);
        localStorage.setItem(quoteKey, JSON.stringify(newQuote));
        setCurrentQuote(newQuote);
      }
    } catch (err) {
      debug.error('DailyQuote', 'Error fetching quote', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch quote'));
    }
  }, []);

  if (error) {
    return (
      <Card className="p-4 sm:p-6 bg-red-50 dark:bg-red-900/10">
        <p className="text-red-600 dark:text-red-400">
          Error loading quote: {error.message}
        </p>
      </Card>
    );
  }

  if (!currentQuote) {
    return (
      <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90">
        <p className="text-gray-600 dark:text-gray-400">Loading quote...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {format(new Date(), 'MMMM d, yyyy')}
            </h3>
            <span className="text-xs sm:text-sm text-gray-500">
              Page {currentQuote.page}
            </span>
          </div>

          <blockquote className="relative text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-3 sm:pl-4 border-l-4 border-blue-500">
            <p className="italic">
              {currentQuote.text}
            </p>
          </blockquote>

          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              {currentQuote.chapter}
            </p>
          </div>
        </motion.div>
      </Card>

      <GuidedMeditation 
        quote={currentQuote.text}
        theme={currentQuote.category}
      />
    </div>
  );
}