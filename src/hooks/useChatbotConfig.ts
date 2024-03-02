import { useContext } from 'preact/hooks';
import { ChatbotContext } from 'src/actions/chatbot/chatbot-context';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { ChatbotWidgetArray } from 'src/actions/chatbot/chatbot-widget-array';

export function useChatbotConfig() {
  const {
    storeName
    // storeLogo,
    // brandColor,
    // placeholderText
  } = useContext(ChatbotContext);

  const ChatbotConfig = {
    initialMessages: [
      createChatBotMessage(`👋 Hi! I am ${storeName} Bot. How can I help?`)
    ],
    widgets: ChatbotWidgetArray,
    state: {
      products: []
    }
  };

  return ChatbotConfig;
}
