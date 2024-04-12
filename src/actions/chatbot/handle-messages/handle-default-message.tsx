import axios from 'axios';
import { StateUpdater } from 'preact/hooks';
import { getChatApiUrl } from 'src/config/chat-api-url';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

interface ChatbotHandlerProps {
  createChatBotMessage: any;
  setLoadingState: StateUpdater<boolean>;
  setAiUserTestResponse: StateUpdater<string>;
}

const HandleDefaultMessage = ({
  createChatBotMessage,
  setLoadingState,
  setAiUserTestResponse
}: ChatbotHandlerProps) => {
  const { session_id, store_id, customer_store_id, setMessages, env } =
    useChatbotContext();

  const handleDefault = async (message: string) => {
    setLoadingState(true);
    setAiUserTestResponse('Loading ...');

    const loadingMessage = createChatBotMessage('Loading ...', {
      loading: true,
      delay: 0,
      withAvatar: true
    }) as IChatbotMessage;

    setMessages((prevMessages) => [...prevMessages, loadingMessage]);
    const chatApiUrl = getChatApiUrl(env);

    const endpoint = `${chatApiUrl}/api/v2/external_chatbot`;

    try {
      await axios.post(endpoint, {
        question: message,
        store_id: Number(store_id),
        customer_id: Number(customer_store_id),
        req_session: session_id,
        greeting: false
      });
      // Since the actual message response is handled by the stream, no need to update context here
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { handleDefault };
};
export default HandleDefaultMessage;
