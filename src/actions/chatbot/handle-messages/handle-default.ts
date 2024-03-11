import { IChatbotMessageOptions } from 'src/types/IChatbotMessages';
import axios from 'axios';

interface HandleDefaultProps {
  createChatBotMessage: (
    message: string,
    options?: IChatbotMessageOptions
  ) => any;
  setState: any;
  message: string;
}

const handleDefault = ({
  createChatBotMessage,
  setState,
  message
}: HandleDefaultProps) => {
  // const botMessage = createChatBotMessage(`You said: ${message}`);
  const req = axios.post('https://api.rmdevs.com/api/v2/external_chatbot', {
    question: message,
    store_id: 12,
    customer_id: 79741,
    req_session: '0cGEgXm4oxQxWx6VGnJJyrRKM7cRNlKC0TyzgRHw',
    greeting: false
  });
  req.then((res) => {
    const botMessage = createChatBotMessage(res.data.answer);
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  });

  // setState((prev: any) => ({
  //   ...prev,
  //   messages: [...prev.messages, botMessage]
  // }));
};

export default handleDefault;
