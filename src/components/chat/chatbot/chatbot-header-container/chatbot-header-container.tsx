import ChatbotHeaderCloseChatButton from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-close-chat-button';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({ setIsOpen }: ChatbotHeaderContainerProps) => {
  const { storeName, storeLogo, brandColor } = useChatbotContext();

  return (
    <>
      <div
        className="w-full px-2"
        style={{ backgroundColor: brandColor }}
      >
        <div
          className="z-10 flex justify-between py-3"
          aria-label="Chatbot Header"
        >
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
          <div className="flex items-center justify-center">
            {/* <BotHeaderResetChatButton /> */}
            <ChatbotHeaderCloseChatButton setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotHeaderContainer;
