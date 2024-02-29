import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { createChatBotMessage } from './chatbot-message-utils';

const { storeName, storeLogo, brandColor } = useChatbotContext();

const ChatbotConfig2 = {
  initialMessages: [
    createChatBotMessage(
      `👋 Hi! I am ${storeName} ChatbotName. How can i help?`
    )
  ]
};

export default ChatbotConfig2;
