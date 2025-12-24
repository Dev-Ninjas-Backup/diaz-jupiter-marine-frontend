/**
 * Chatbot Type Definitions
 *
 * This file contains all TypeScript interfaces and types used in the AI Chatbot feature.
 */

/**
 * Represents a single yacht result from the chatbot search
 */
export interface ChatbotResult {
  /** Unique identifier for the yacht */
  id: string;

  /** Full title including yacht name, model, and year */
  title: string;

  /** Formatted price string (e.g., "$799,000") */
  price: string;

  /** URL or path to the yacht image */
  image: string;

  /** Optional: Additional yacht details */
  details?: {
    year?: number;
    model?: string;
    manufacturer?: string;
    length?: string;
    location?: string;
  };
}

/**
 * Props for the ChatbotModal component
 */
export interface ChatbotModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean;

  /** Callback function to close the modal */
  onClose: () => void;

  /** Optional: User ID for tracking conversations */
  userId?: string;
}

/**
 * API request structure for chatbot search
 */
export interface ChatbotSearchRequest {
  /** User's search query */
  query: string;

  /** Optional: Number of results to return */
  limit?: number;

  /** Optional: Filters to apply to the search */
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    yearRange?: [number, number];
    manufacturer?: string;
    location?: string;
  };
}

/**
 * API response structure for chatbot search
 */
export interface ChatbotSearchResponse {
  /** Array of yacht results */
  results: ChatbotResult[];

  /** Total number of results available */
  totalCount?: number;

  /** Optional: AI-generated summary or recommendation */
  aiSummary?: string;

  /** Optional: Suggested follow-up queries */
  suggestedQueries?: string[];
}

/**
 * Conversation message structure for future chat history feature
 */
export interface ChatMessage {
  /** Unique message ID */
  id: string;

  /** Message role: user or assistant */
  role: 'user' | 'assistant';

  /** Message content */
  content: string;

  /** Timestamp when message was sent */
  timestamp: Date;

  /** Optional: Attached results for assistant messages */
  results?: ChatbotResult[];
}

/**
 * Chatbot state management interface
 */
export interface ChatbotState {
  /** Current search query */
  query: string;

  /** Current search results */
  results: ChatbotResult[];

  /** Loading state for search */
  isSearching: boolean;

  /** Error message if search fails */
  error?: string;

  /** Conversation history (for future implementation) */
  messages?: ChatMessage[];
}
