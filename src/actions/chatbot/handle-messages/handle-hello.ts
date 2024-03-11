import { IChatbotMessageOptions } from 'src/types/IChatbotMessages';

interface HandleHelloProps {
  createChatBotMessage: (
    message: string,
    options?: IChatbotMessageOptions
  ) => any;
  setState: any;
}

const handleHello = ({ createChatBotMessage, setState }: HandleHelloProps) => {
  const botMessage = createChatBotMessage('Hello. Nice to meet you.');
  setState((prev: any) => ({
    ...prev,
    messages: [...prev.messages, botMessage]
  }));
};

export default handleHello;
