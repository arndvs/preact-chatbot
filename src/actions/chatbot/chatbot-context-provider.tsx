import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { BotDataType, defaultBotData } from 'src/types/ChatBotDataTypes';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

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
  messages: IChatbotMessage[];
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
  messages: IChatbotMessage[];
  setMessages: (
    messages:
      | IChatbotMessage[]
      | ((prevMessages: IChatbotMessage[]) => IChatbotMessage[])
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
  const [messages, setMessages] = useState<IChatbotMessage[]>(initialMessages);
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
