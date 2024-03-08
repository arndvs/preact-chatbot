import { createContext } from 'preact';

interface ChatbotContextType {
  storeName?: string;
  storeLogo?: string;
  brandColor?: string;
  placeholderText?: string;
  session_id?: string;
  store_id?: string;
}

export const ChatbotContext = createContext<ChatbotContextType>({});
