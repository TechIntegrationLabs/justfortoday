"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const topics = [
  "Surrender",
  "Acceptance",
  "Faith",
  "Willingness",
  "Honesty",
  "Open-mindedness",
  "Progress",
  "Gratitude",
  "Service",
  "Unity"
];

const prompts = [
  "What does recovery mean to me today?",
  "How am I practicing acceptance in my life?",
  "What am I grateful for in this moment?",
  "How has my perspective changed since beginning recovery?",
  "What positive changes have I noticed in myself lately?",
  "How can I be of service to others today?",
  "What tools am I using to maintain my recovery?",
  "What does 'just for today' mean to me?",
  "How am I building a support network?",
  "What healthy coping mechanisms am I developing?"
];

export function ReflectionPrompt() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const nextReflection = () => {
    setCurrentTopic((prev) => (prev + 1) % topics.length);
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {topics[currentTopic]}
          </h3>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          {prompts[currentPrompt]}
        </p>

        <div className="flex justify-end">
          <Button
            onClick={nextReflection}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            Next Reflection
          </Button>
        </div>
      </motion.div>
    </Card>
  );
}