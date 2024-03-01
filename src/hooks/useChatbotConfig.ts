import { useContext } from 'preact/hooks';
import { ChatbotContext } from 'src/actions/chatbot/chatbot-context';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';

export function useChatbotConfig() {
  const { storeName } = useContext(ChatbotContext);

  const ChatbotConfig = {
    initialMessages: [
      createChatBotMessage(`👋 Hi! I am ${storeName} Bot. How can I help?`)
    ],
    botName: storeName
  };

  return ChatbotConfig;
}
