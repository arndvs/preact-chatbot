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
  placeholderText: string;
  profilePicture: string;
  displayName: string;
  userMessageBackgroundColor: string;
  chatIcon: string;
  chatBubbleButtonColor: string;
  islandType: string | undefined;
  env: string | null;
  islandName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatHeadingFontColor: string;
  botGreeting: string;

  userMessageFontColor: string;
  chatBubbleButtonIconColor: string;
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
  placeholderText: '',
  profilePicture: '',
  displayName: '',
  userMessageBackgroundColor: '',
  chatIcon: '',
  chatBubbleButtonColor: '',
  chatHeadingFontColor: '',
  botGreeting: '',

  userMessageFontColor: '',
  chatBubbleButtonIconColor: '',
  setMessages: () => {},
  botData: defaultBotData,
  setBotData: () => {},
  resetChatTimeline: () => {},
  islandType: '',
  domain: '',
  env: null,
  islandName: '',
  isOpen: false,
  setIsOpen: () => {}
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
    placeholderText,
    profilePicture,
    displayName,
    userMessageBackgroundColor,
    userMessageFontColor,
    chatIcon,
    chatBubbleButtonColor,
    islandType,
    env,
    islandName,
    chatHeadingFontColor,
    botGreeting,
    chatBubbleButtonIconColor
  } = props;
  const [botData, setBotData] = useState<BotDataType>(defaultBotData);
  const [messages, setMessages] = useState<IChatbotMessage[]>(initialMessages);
  const [sessionId, setSessionId] = useState<string>(session_id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies(['ripemetrics_chatbot']);

  const resetChatTimeline = (newSessionId: string) => {
    const initialMessage = createChatBotMessage(`${botGreeting}`, {
      loading: false
    });

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
    cookie,
    chatHeadingColor,
    chatHeadingFontColor,
    botGreeting,

    userMessageFontColor,
    chatBubbleButtonIconColor,
    //   initialMessages,
    profilePicture,
    displayName,
    userMessageBackgroundColor,
    chatIcon,
    chatBubbleButtonColor,
    islandType,
    env,
    islandName,
    isOpen,
    setIsOpen
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
