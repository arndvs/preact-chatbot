import { createChatBotMessage } from '../actions/chatbot-message-utils';

const ChatbotConfig = {
  initialMessages: [
    createChatBotMessage(`👋 Hi! I am ChatbotName. How can i help?`)
  ]
};

export default ChatbotConfig;
