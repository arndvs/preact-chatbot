import { StateUpdater, useState } from 'preact/hooks';
import axios from 'axios';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotHandlerProps {
  createChatBotMessage: any;
  setState: any;
  setLoadingState: StateUpdater<boolean>;
  setAiUserTestResponse: StateUpdater<string>;
}

const HandleDefaultMessage = ({
  createChatBotMessage,
  setState,
  setLoadingState,
  setAiUserTestResponse
}: ChatbotHandlerProps) => {
  const { session_id, store_id } = useChatbotContext();
  //   const [loadingState, setLoadingState] = useState(false);
  //   const [aiUserTestResponse, setAiUserTestResponse] = useState<string>('');

  const handleDefault = async (message: string) => {
    setLoadingState(true);
    setAiUserTestResponse('Loading ...');

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

      const response = res.data.message;

      console.log('response:', response);

      const botMessage = createChatBotMessage(response);
      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoadingState(false);
    }
  };

  return { handleDefault };
};

export default HandleDefaultMessage;
