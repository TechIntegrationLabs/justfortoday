"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyMessageProps {
  days: number;
}

const messages = [
  "Just for today, I will try to live through this day only, and not tackle my whole life problem at once.",
  "Just for today, I will be happy. This assumes that what Abraham Lincoln said is true, that 'most folks are about as happy as they make up their minds to be.'",
  "Just for today, I will adjust myself to what is, and not try to adjust everything to my own desires.",
  "Just for today, I will take care of my body. I will exercise it, care for it, and nourish it, and not abuse it nor neglect it.",
  "Just for today, I will try to strengthen my mind. I will study. I will learn something useful. I will not be a mental loafer.",
  "Just for today, I will exercise my soul in three ways: I will do somebody a good turn, and not get found out; if anybody knows of it, it will not count.",
  "Just for today, I will be agreeable. I will look as well as I can, dress as becomingly as possible, talk low, act courteously, be liberal with praise, criticize not at all, nor find fault with anything and not try to regulate nor improve anyone.",
];

export function DailyMessage({ days }: DailyMessageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");
    let currentChar = 0;
    const message = messages[currentIndex];

    const typingInterval = setInterval(() => {
      if (currentChar < message.length) {
        setDisplayedText(prev => prev + message[currentChar]);
        currentChar++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  const navigateMessage = (direction: "prev" | "next") => {
    setCurrentIndex(prev => {
      if (direction === "prev") {
        return prev === 0 ? messages.length - 1 : prev - 1;
      } else {
        return prev === messages.length - 1 ? 0 : prev + 1;
      }
    });
  };

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="text-lg text-gray-700 dark:text-gray-300 min-h-[120px]">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="ghost"
            onClick={() => navigateMessage("prev")}
            className="text-gray-600 dark:text-gray-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {messages.length}
          </span>
          
          <Button
            variant="ghost"
            onClick={() => navigateMessage("next")}
            className="text-gray-600 dark:text-gray-400"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>
    </Card>
  );
}