import { createContext } from 'preact';

interface ChatbotContextType {
  storeName?: string;
  storeLogo?: string;
  brandColor?: string;
  placeholderText?: string;
}

export const ChatbotContext = createContext<ChatbotContextType>({});
