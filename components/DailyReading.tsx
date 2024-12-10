"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function DailyReading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-xl space-y-6">
        <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
          "This ability to listen is a gift and grows as we grow spiritually; life takes on a new meaning when we open ourselves to this gift."
        </blockquote>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Basic Text, p. 107
        </p>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Have you ever watched two small children carry on a conversation? One will be talking about purple dragons while the other carries on about the discomfort caused by having sand in one's shoes. We sometimes encounter the same communication problems as we learn to listen to others. We may struggle through meetings, trying desperately to hear the person sharing while our minds are busy planning what we will say when it's our turn to speak. In conversation, we may suddenly realize that our answers have nothing to do with the questions we're being asked. They are, instead, speeches prepared while in the grip of our self-obsession.
          </p>
          <p>
            Learning how to listen—really listen—is a difficult task, but one that's not beyond our reach. We might begin by acknowledging in our replies what our conversational partner is saying. We might ask if there is anything we can do to help when someone expresses a problem. With a little practice, we can find greater freedom from self-obsession and closer contact with the people in our lives.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">
            Just for Today:
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            I will quiet my own thoughts and listen to what someone else is saying.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}