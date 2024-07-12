import { useContext } from 'preact/hooks';
import { ChatbotContext } from 'src/actions/chatbot/chatbot-context-provider';

import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { ChatbotWidgetArray } from 'src/actions/chatbot/chatbot-widget-array';

export function useChatbotConfig() {
  const { storeName, botGreeting } = useContext(ChatbotContext);

  const ChatbotConfig = {
    initialMessages: [
      createChatBotMessage(`${botGreeting}`, {
        loading: true
      })
    ],
    widgets: ChatbotWidgetArray,
    state: {
      products: []
    }
  };

  return ChatbotConfig;
}
