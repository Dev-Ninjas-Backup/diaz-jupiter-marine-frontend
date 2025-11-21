'use client';

import { useEffect, useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import ChatbotModal from './ChatbotModal';

// Generate unique user ID in format "FY026478"
const generateUserId = (): string => {
  const randomNum = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0');
  return `FY${randomNum}`;
};

// Get or create user ID from localStorage
const getOrCreateUserId = (): string => {
  const STORAGE_KEY = 'GENERATED_UID';

  // Check if running in browser
  if (typeof window === 'undefined') return '';

  // Check if user ID exists in localStorage
  const existingId = localStorage.getItem(STORAGE_KEY);

  if (existingId) {
    console.log('Welcome back!');
    return existingId;
  }

  // Generate new ID and store it
  const newId = generateUserId();
  localStorage.setItem(STORAGE_KEY, newId);
  console.log('New user ID generated:', newId);
  return newId;
};

const AskAI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Initialize user ID on component mount
    const id = getOrCreateUserId();
    setUserId(id);
  }, []);

  const openChatBotModal = () => {
    setIsModalOpen(true);
  };

  const closeChatBotModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openChatBotModal}
        className="fixed bottom-[2%] right-[2%] z-50 p-3 md:p-5 rounded-full bg-white border border-gray-200 shadow-lg flex flex-col justify-center items-center gap-1 md:gap-2 hover:shadow-xl transition-shadow duration-200"
      >
        <IoSparklesSharp className="text-[#004DAC] text-xl" />
        <span className="font-semibold text-sm md:text-base">Ask AI</span>
      </button>

      <ChatbotModal
        isOpen={isModalOpen}
        onClose={closeChatBotModal}
        userId={userId}
      />
    </>
  );
};

export default AskAI;
