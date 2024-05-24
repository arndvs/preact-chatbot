import axios from 'axios';
import { getChatApiUrl } from 'src/config/chat-api-url';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

const HandleDefaultMessage = () => {
  const { session_id, store_id, customer_store_id, setMessages, env } =
    useChatbotContext();

  const handleDefault = async (message: string) => {
    const chatApiUrl = getChatApiUrl(env);

    const endpoint = `${chatApiUrl}/api/v2/external_chatbot`;

    try {
      await axios.post(endpoint, {
        question: message,
        store_id: store_id,
        customer_id: customer_store_id,
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
