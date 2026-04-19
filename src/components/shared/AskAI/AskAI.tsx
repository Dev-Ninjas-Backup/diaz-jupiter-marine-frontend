'use client';

import chatBotImg from '@/assets/robot.png';
import yachtImg from '@/assets/ship.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChatbotModal from './ChatbotModal';

interface UserFormData {
  name: string;
  email: string;
}

// Generate unique user ID in format "FY026478"
const generateUserId = (): string => {
  const randomNum = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0');
  return `FY${randomNum}`;
};

// Get or create user ID from localStorage
const getOrCreateUserId = (): {
  id: string;
  hasUserInfo: boolean;
} => {
  const STORAGE_KEY = 'GENERATED_UID';

  // Check if running in browser
  if (typeof window === 'undefined') return { id: '', hasUserInfo: false };

  // Check if user ID exists in localStorage
  const existingId = localStorage.getItem(STORAGE_KEY);
  const email = localStorage.getItem('USER_EMAIL');
  const name = localStorage.getItem('USER_NAME');

  if (existingId && email && name) {
    console.log('Welcome back!');
    return { id: existingId, hasUserInfo: true };
  }

  // Generate new ID and store it
  const newId = generateUserId();
  localStorage.setItem(STORAGE_KEY, newId);
  console.log('New user ID generated:', newId);
  return { id: newId, hasUserInfo: false };
};

const AskAI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    // Initialize user ID on component mount
    const { id } = getOrCreateUserId();
    setUserId(id);
  }, []);

  const openChatBotModal = () => {
    // Check if user info exists before opening chatbot
    const email = localStorage.getItem('USER_EMAIL');
    const name = localStorage.getItem('USER_NAME');

    if (!email || !name) {
      setIsUserFormOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeChatBotModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitUserForm = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      // Save to AI backend
      const aiApiUrl =
        process.env.NEXT_PUBLIC_CHATBOT_API_URL ||
        'http://localhost:8000/api/v1';
      const baseApiUrl =
        process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000/api/v1';

      await fetch(`${aiApiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          name: data.name,
          email: data.email,
          messages: 'User registered via welcome popup',
        }),
      });

      // Also save lead to main backend (excluding messages field)
      await fetch(`${baseApiUrl}/daily_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          name: data.name,
          email: data.email,
        }),
      });

      // Save user info to localStorage
      localStorage.setItem('USER_EMAIL', data.email);
      localStorage.setItem('USER_NAME', data.name);
      localStorage.setItem('PLATFORM', 'Jupiter_Marine_Sales');

      console.log('User info saved:', data);

      // Close the form modal
      setIsUserFormOpen(false);
      toast.success('Thank you! You can now enjoy this website.', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Failed to save user info:', error);
      // Still save to localStorage even if API fails
      localStorage.setItem('USER_EMAIL', data.email);
      localStorage.setItem('USER_NAME', data.name);
      localStorage.setItem('PLATFORM', 'Jupiter_Marine_Sales');

      setIsUserFormOpen(false);
      toast.success('Thank you! You can now enjoy this website.', {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-[2%] right-[1.5%] z-50 flex flex-col items-end gap-3">
        {/* Animated Text Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold whitespace-nowrap"
        >
          💬 Need help? Ask me anything!
        </motion.div>

        <button
          onClick={openChatBotModal}
          className="p-2 md:p-3 rounded-full bg-white border border-gray-200 shadow-lg flex flex-col justify-center items-center gap-1 md:gap-2 hover:shadow-xl transition-shadow duration-200 group"
        >
          <motion.div
            animate={{
              y: [5, 0, -5],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <Image src={chatBotImg} alt="Ask AI" width={36} height={36} />
          </motion.div>
          {/* <IoSparklesSharp className="text-[#004DAC] text-xl" />
        <span className="font-semibold text-sm md:text-base">Ask AI</span> */}
        </button>
      </div>

      {/* User Info Form Modal */}
      {isUserFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center  backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-xl p-8 md:p-10 relative border border-blue-100 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl z-0" />

            <div className="relative z-10">
              {/* Icon and Header */}
              <div className="flex items-center justify-center">
                <div className=" flex items-center gap-3">
                  <Image
                    src={yachtImg}
                    alt="YACHT Images"
                    width={70}
                    height={70}
                    className=""
                  />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome to Jupiter Marine Sales
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-2">
                  For your{' '}
                  <span className="font-semibold text-blue-600">privacy</span>{' '}
                  and a{' '}
                  <span className="font-semibold text-blue-600">
                    better engaging experience
                  </span>
                  , we need some information.
                </p>
                <p className="text-sm text-gray-500">
                  Your information helps us provide personalized assistance
                  through our AI-powered platform.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitUserForm)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2"
                  >
                    <span className="text-blue-600">👤</span> Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2"
                  >
                    <span className="text-blue-600">✉️</span> Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Website</span>
                        <span className="text-xl">→</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  🔒 Your information is secure and will only be used to enhance
                  your experience.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <ChatbotModal
        isOpen={isModalOpen}
        onClose={closeChatBotModal}
        userId={userId}
      />
    </>
  );
};

export default AskAI;
