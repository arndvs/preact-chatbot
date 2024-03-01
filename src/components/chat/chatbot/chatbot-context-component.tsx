import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotContextComponent = () => {
  const { storeName, storeLogo, brandColor, placeholderText } =
    useChatbotContext();

  return (
    <div>
      <p>StoreName: {storeName}</p>
      <div>
        <p>logo:</p>{' '}
        <img
          src={storeLogo}
          alt="Store Logo"
        />
      </div>
      <p>brandColor: {brandColor}</p>
      <p>placeHolderTex: {placeholderText}</p>
    </div>
  );
};

export default ChatbotContextComponent;
