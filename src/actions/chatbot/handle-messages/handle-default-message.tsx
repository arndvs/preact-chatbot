import axios from 'axios';
import { StateUpdater } from 'preact/hooks';
import { Message } from 'src/actions/chatbot/chatbot-context-provider';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

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
  const { session_id, store_id, customer_store_id, setMessages } =
    useChatbotContext();

  const handleDefault = async (message: string) => {
    setLoadingState(true);
    setAiUserTestResponse('Loading ...');

    const loadingMessage = createChatBotMessage('Loading ...', {
      loading: true,
      delay: 0,
      withAvatar: true
    }) as Message;

    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      await axios.post(`${process.env.BASE_API_URL}v2/external_chatbot`, {
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
