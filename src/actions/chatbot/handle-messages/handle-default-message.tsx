import axios from 'axios';
import { StateUpdater } from 'preact/hooks';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotHandlerProps {
  createChatBotMessage: any;
  setState: any;
  aiUserTestResponse: any;
  setLoadingState: StateUpdater<boolean>;
  setAiUserTestResponse: StateUpdater<string>;
}

const HandleDefaultMessage = ({
  createChatBotMessage,
  setState,
  setLoadingState,
  aiUserTestResponse,
  setAiUserTestResponse
}: ChatbotHandlerProps) => {
  const { session_id, store_id } = useChatbotContext();

  const handleDefault = async (message: string) => {
    setLoadingState(true);
    setAiUserTestResponse('Loading ...');

    const loadingMessage = createChatBotMessage(aiUserTestResponse, {
      loading: true,
      delay: 0,
      withAvatar: true
    });

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, loadingMessage]
    }));
    try {
      const res = await axios.post(
        'https://api.rmdevs.com/api/v2/external_chatbot',
        {
          question: message,
          store_id: store_id,
          customer_id: 79741,
          req_session: session_id,
          greeting: false
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { handleDefault };
};

export default HandleDefaultMessage;
