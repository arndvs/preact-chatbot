import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotHeaderAvatar = () => {
  const { storeName, storeLogo, brandColor } = useChatbotContext();
  return (
    <div className="flex items-center">
      {storeLogo ? (
        <img
          src={storeLogo ?? ''}
          className="w-8 h-8 mr-2 rounded-full"
        />
      ) : (
        <div
          className="w-8 h-8 m-1 mr-2 rounded-full"
          style={{ backgroundColor: brandColor }}
        >
          icon
        </div>
      )}

      <h1 className="text-lg font-semibold text-white">{storeName}</h1>
    </div>
  );
};

export default ChatbotHeaderAvatar;
