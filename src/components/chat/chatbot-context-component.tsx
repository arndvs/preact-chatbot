import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotContextComponent = () => {
  const { storeName, storeLogo, brandColor } = useChatbotContext();

  return (
    <div>
      <h2 className="pb-2 text-base font-semibold leading-7 text-gray-600">
        Items currently available in the store's chatbot context:
      </h2>
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
