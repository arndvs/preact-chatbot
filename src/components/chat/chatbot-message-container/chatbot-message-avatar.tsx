import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotMessageAvatar = () => {
  const { storeLogo } = useChatbotContext();

  return (
    <div className="relative ml-1">
      <img
        className="flex items-center justify-center w-10 h-10 rounded-full "
        src={storeLogo}
        alt=""
      />
    </div>
  );
};

export default ChatbotMessageAvatar;
