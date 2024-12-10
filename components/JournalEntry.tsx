"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MeditationService } from "@/lib/meditation-service";
import { debug } from "@/lib/debug";

interface JournalEntryProps {
  onClose: () => void;
}

export function JournalEntry({ onClose }: JournalEntryProps) {
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (content.trim().toUpperCase() === "REGEN") {
      debug.log('JournalEntry', 'Regenerating daily reflection');
      await MeditationService.regenerateMeditation();
      window.location.reload();
      return;
    }
    
    // Here you would typically save the journal entry
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Write Your Thoughts</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-500">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts for today..."
          className="w-full h-64 p-4 mb-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            Save Entry
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}