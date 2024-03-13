import { IChatbotMessageOptions } from 'src/types/IChatbotMessages';

interface HandleHelloProps {
  createChatBotMessage: (
    message: string,
    options?: IChatbotMessageOptions
  ) => any;
  setState: any;
}
// this was getting in the way for some reason it was highjacking the chatbot commented out for now
// const handleHello = ({ createChatBotMessage, setState }: HandleHelloProps) => {
//   const botMessage = createChatBotMessage('Hello. Nice to meet you.', {loading:true});
//   setState((prev: any) => ({
//     ...prev,
//     messages: [...prev.messages, botMessage]
//   }));
// };

// export default handleHello;
