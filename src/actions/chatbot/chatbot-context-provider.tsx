import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import { useCookies } from 'react-cookie';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { BotDataType, defaultBotData } from 'src/types/ChatBotDataTypes';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

interface ChatbotContextProps {
  children: ComponentChildren;
  storeName: string;
  storeLogo: string;
  brandColor: string;
  session_id: string;
  store_id: string;
  customer_store_id: string;
  domain?: string;
  messages: IChatbotMessage[];
  chatHeadingColor: string;
  suggestedMessages: string[];
  placeholderText: string;
  profilePicture: string;
  displayName: string;
  userMessageColor: string;
  chatIcon: string;
  chatBubbleButtonColor: string;
  chatType: string;
}

interface ChatbotContextType extends ChatbotContextProps {
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
  children: null,
  storeName: '',
  storeLogo: '',
  brandColor: '',
  session_id: '',
  store_id: '',
  customer_store_id: '',
  messages: [],
  chatHeadingColor: '',
  suggestedMessages: [],
  placeholderText: '',
  profilePicture: '',
  displayName: '',
  userMessageColor: '',
  chatIcon: '',
  chatBubbleButtonColor: '',
  setMessages: () => {},
  botData: defaultBotData,
  setBotData: () => {},
  resetChatTimeline: () => {},
  chatType: ''
});

export const ChatbotContextProvider = ({
  children,
  ...props
}: ChatbotContextProps) => {
  const {
    storeName,
    storeLogo,
    brandColor,
    session_id,
    store_id,
    domain,
    customer_store_id,
    messages: initialMessages,
    chatHeadingColor,
    suggestedMessages,
    placeholderText,
    profilePicture,
    displayName,
    userMessageColor,
    chatIcon,
    chatBubbleButtonColor,
    chatType
  } = props;
  const [botData, setBotData] = useState<BotDataType>(defaultBotData);
  const [messages, setMessages] = useState<IChatbotMessage[]>(initialMessages);
  const [sessionId, setSessionId] = useState<string>(session_id);
  const [cookie, setCookie] = useCookies(['ripemetrics_chatbot']);

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
    children,
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
    resetChatTimeline,
    cookie: cookie.ripemetrics_chatbot,
    chatHeadingColor,
    //   initialMessages,
    suggestedMessages,
    profilePicture,
    displayName,
    userMessageColor,
    chatIcon,
    chatBubbleButtonColor,
    chatType
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
