'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FcProcess } from 'react-icons/fc';

const loadingMessages = [
  'Thinking... 🤔',
  'Fetching... ⏳',
  'Coming right up...😎',
  'Just a few seconds away...⌛',
  'Almost there...😁',
  'Loading your results...🤖',
  'Analyzing data...⚙️',
  'Preparing insights...🔍',
];

export default function AnimatedLoadingMessages() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-8 text-left">
      <div className="h-6 flex items-center justify-start gap-2">
        <FcProcess className="text-xl animate-spin" />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-600 font-medium"
          >
            {loadingMessages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
