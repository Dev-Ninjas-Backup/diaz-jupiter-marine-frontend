'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { chatHistory, sendMessageToChatBot } from '@/services/chatBot';
import type { ChatbotModalProps } from '@/types/chatbot-types';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose, IoSend, IoSparklesSharp } from 'react-icons/io5';
import AnimatedLoadingMessages from './AnimatedLoadingMessages';
import { renderMessage } from './RenderMessage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;

    console.log('User ID in ChatbotModal:', userId);

    const fetchChatHistory = async () => {
      try {
        const chatHistoryData = await chatHistory(userId);
        console.log('Chat History:', chatHistoryData);
        if (Array.isArray(chatHistoryData)) {
          setChatMessages(chatHistoryData);
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  // Auto-scroll to bottom when modal opens or new messages arrive
  useEffect(() => {
    if (isOpen && chatMessages.length > 0) {
      // Scroll to bottom when modal opens or messages change
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'instant' });
      }, 100);
    }
  }, [isOpen, chatMessages, isSearching]);

  // Function to render markdown-like content

  // Search function with API integration
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return;
    }

    // Add user message immediately
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: searchQuery },
    ]);
    setQuery('');
    setIsSearching(true);

    try {
      // API call to chatbot using the service
      const data = await sendMessageToChatBot({
        message: searchQuery,
        userId: userId || null,
      });

      console.log('Chatbot response:', data);
      console.log('User ID:', userId);

      // Fetch updated chat history after sending message
      if (userId) {
        try {
          const chatHistoryData = await chatHistory(userId);
          console.log('Updated Chat History:', chatHistoryData);
          if (Array.isArray(chatHistoryData)) {
            setChatMessages(chatHistoryData);
          }
        } catch (historyError) {
          console.error('Failed to fetch updated chat history:', historyError);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-md md:max-w-2xl h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Jupiter Marine AI Assistant
        </DialogTitle>
        <DialogDescription className="sr-only">
          Chat with our AI assistant to help you find the perfect boat
        </DialogDescription>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0">
          <div className="flex items-center gap-3">
            <IoSparklesSharp className="text-[#004DAC] text-xl" />
            <h2 className="text-lg font-semibold text-gray-900">
              Jupiter Marine AI
            </h2>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
            onClick={onClose}
          >
            <IoClose className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
          {/* Chat History Display */}
          {chatMessages.length > 0 && (
            <div className="px-4 py-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className="space-y-2">
                  {message.role === 'user' ? (
                    // User Message
                    <div className="flex justify-end">
                      <div className="bg-[#004DAC] text-white rounded-lg px-4 py-3 max-w-[80%]">
                        <p className="text-sm font-medium mb-1">You:</p>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    // Assistant Message
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 max-w-[90%]">
                        <div className="flex items-center gap-2 mb-2">
                          <IoSparklesSharp className="text-[#004DAC] text-base" />
                          <span className="font-medium text-sm text-gray-700">
                            Jupiter Marine AI:
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          {renderMessage(message.content)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isSearching && <AnimatedLoadingMessages />}

          {/* Empty State */}
          {!isSearching && chatMessages.length === 0 && (
            <div className="px-4 py-8 text-center">
              <IoSparklesSharp className="text-[#004DAC] text-4xl mx-auto mb-3" />
              <p className="text-sm lg:text-lg font-medium text-gray-900 mb-2">
                Welcome to Jupiter Marine AI
              </p>
              <p className="text-sm text-gray-500">
                Ask me anything about boats, yachts, or marine sales...
              </p>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t bg-white shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <input
              type="text"
              placeholder="Ask about boats, prices, specifications..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-500"
            />
            <button
              onClick={() => handleSearch(query)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors shrink-0"
              aria-label="Search"
            >
              <IoSparklesSharp className="text-[#004DAC] text-lg" />
            </button>
            <button
              onClick={() => handleSearch(query)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors shrink-0"
              aria-label="Send message"
            >
              <IoSend className="text-[#004DAC] text-lg" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;
