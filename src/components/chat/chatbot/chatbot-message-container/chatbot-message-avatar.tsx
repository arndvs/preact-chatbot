import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotMessageAvatar = () => {
  const { storeLogo } = useChatbotContext();

  return (
    <div className="relative p-1 ml-1">
      <img
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-md"
        src={storeLogo}
        alt=""
      />
    </div>
  );
};

export default ChatbotMessageAvatar;
