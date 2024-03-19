import { createContext, type ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { BotDataType, defaultBotData } from 'src/types/ChatBotDataTypes';

export interface Message {
  message: string;
  loading?: boolean;
  id: number;
  type: string;
  widget?: string;
  delay?: number;
  payload?: any;
}
interface ChatbotContextProviderProps {
  children: ComponentChildren;
  storeName: string;
  storeLogo: string;
  brandColor: string;
  placeholderText: string;
  session_id: string;
  store_id: string;
  customer_store_id: string;
  domain?: string;
  messages: Message[];
}

interface ChatbotContextType {
  storeName?: string;
  storeLogo?: string;
  brandColor?: string;
  placeholderText?: string;
  session_id?: string;
  store_id?: string;
  customer_store_id?: string;
  domain?: string | undefined;
  messages: Message[];
  setMessages: (
    messages: Message[] | ((prevMessages: Message[]) => Message[])
  ) => void;
  botData?: BotDataType;
  setBotData?: (data: BotDataType) => void;
  resetChatTimeline: (newSessionId: string) => void;
}

export const ChatbotContext = createContext<ChatbotContextType>({
  botData: defaultBotData,
  setBotData: () => {},
  messages: [],
  setMessages: () => {},
  resetChatTimeline: () => {}
});

export const ChatbotContextProvider = ({
  children,
  storeName,
  storeLogo,
  brandColor,
  placeholderText,
  session_id,
  store_id,
  customer_store_id,
  domain,
  messages: initialMessages
}: ChatbotContextProviderProps) => {
  const [botData, setBotData] = useState<BotDataType>(defaultBotData);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [sessionId, setSessionId] = useState<string>(session_id);

  const resetChatTimeline = (newSessionId: string) => {
    const initialMessage = createChatBotMessage(
      `👋 Hi! I am ${storeName} Bot. How can I help?`,
      {
        loading: false
      }
    );

    setSessionId(newSessionId);
    setMessages([initialMessage]);
  };

  // Construct the value object explicitly
  const value = {
    storeName,
    storeLogo,
    brandColor,
    placeholderText,
    session_id: sessionId,
    store_id,
    customer_store_id,
    domain,
    messages,
    setMessages,
    botData,
    setBotData,
    resetChatTimeline
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
