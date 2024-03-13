import { useState } from 'preact/hooks';
import axios from 'axios';

interface ChatbotHandlerProps {
  createChatBotMessage: any;
  setState: any;
}

const HandleDefaultMessage = ({
  createChatBotMessage,
  setState
}: ChatbotHandlerProps) => {
  const [loadingState, setLoadingState] = useState(false);
  const [aiUserTestResponse, setAiUserTestResponse] = useState<string>('');

  const handleDefault = async (message: string) => {
    setLoadingState(true);
    setAiUserTestResponse('Loading ...');

    const botMessage = createChatBotMessage(`You said: ${message}`);
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));

    try {
      const res = await axios.post(
        'https://api.rmdevs.com/api/v2/external_chatbot',
        {
          question: message,
          store_id: 12,
          customer_id: 79741,
          req_session: '0cGEgXm4oxQxWx6VGnJJyrRKM7cRNlKC0TyzgRHw',
          greeting: false
        }
      );

      const botMessage = createChatBotMessage(res.data.answer);
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

  return { handleDefault, loadingState, aiUserTestResponse };
};

export default HandleDefaultMessage;
