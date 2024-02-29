import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotContextComponent = () => {
  const { storeName, storeLogo, brandColor } = useChatbotContext();

  return (
    <div>
      <p>{storeName}</p>
      <img
        src={storeLogo}
        alt="Store Logo"
      />
      <p>{brandColor}</p>
    </div>
  );
};

export default ChatbotContextComponent;
