import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { BotDataType, defaultBotData } from 'src/types/ChatBotDataTypes';
import { createContext } from 'preact';

interface ChatbotContextProviderProps {
  children: ComponentChildren;
  storeName: string;
  storeLogo: string;
  brandColor: string;
  placeholderText: string;
  session_id: string;
  store_id: string;
}
interface ChatbotContextType {
  storeName?: string;
  storeLogo?: string;
  brandColor?: string;
  placeholderText?: string;
  session_id?: string;
  store_id?: string;
  botData?: BotDataType;
  setBotData?: (data: BotDataType) => void;
}

export const ChatbotContext = createContext<ChatbotContextType>({
  botData: defaultBotData,
  setBotData: () => {}
});

export const ChatbotContextProvider = ({
  children,
  ...props
}: ChatbotContextProviderProps) => {
  const [botData, setBotData] = useState<BotDataType>(
    // initialBotData ||
    defaultBotData
  );

  return (
    <ChatbotContext.Provider value={{ botData, setBotData, ...props }}>
      {children}
    </ChatbotContext.Provider>
  );
};
