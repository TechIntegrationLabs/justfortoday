"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";

export function JournalPrompt() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Today's Reflection
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            How can you practice better listening in your recovery today?
          </p>
          {isExpanded ? (
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
              placeholder="Write your thoughts here..."
            />
          ) : (
            <Button
              onClick={() => setIsExpanded(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <PenTool className="mr-2 h-4 w-4" />
              Write Your Reflection
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}