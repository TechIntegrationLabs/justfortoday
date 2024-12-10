"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { MeditationService } from "@/lib/meditation-service";
import { debug } from "@/lib/debug";

interface DailyReflectionProps {
  quote: string;
  theme: string;
}

export function GuidedMeditation({ quote, theme }: DailyReflectionProps) {
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReflection = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await MeditationService.getOrGenerateMeditation(quote, theme);
        
        if (result) {
          setReflection(result);
          setIsExpanded(true);
        } else {
          throw new Error("Unable to load reflection. Please try again later.");
        }
      } catch (err) {
        debug.error('DailyReflection', 'Error loading reflection', err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadReflection();
  }, [quote, theme]);

  return (
    <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          {reflection && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 ml-auto"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-red-500 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <AnimatePresence>
          {reflection && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="prose dark:prose-invert max-w-none">
                {reflection.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
}