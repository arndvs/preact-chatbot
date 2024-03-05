import { useContext } from 'preact/hooks';
import { ChatbotContext } from 'src/actions/chatbot/chatbot-context';

// Custom hook for using chatbot context
export function useChatbotContext() {
  const context = useContext(ChatbotContext);

  if (context === undefined) {
    throw new Error(
      'useChatbotContext must be used within a ChatbotContextProvider'
    );
  }

  return context;
}
