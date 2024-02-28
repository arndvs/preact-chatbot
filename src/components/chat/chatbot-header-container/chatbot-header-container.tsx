import ChatbotHeaderCloseChatButton from 'src/components/chat/chatbot-header-container/chatbot-header-close-chat-button';
import BotHeaderResetChatButton from 'src/components/chat/chatbot-header-container/chatbot-header-reset-chat-button';
import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({
  storeLogo,
  brandColor,
  storeName,
  setIsOpen
}: ChatbotHeaderContainerProps) => {
  return (
    <>
      <div className="w-full px-2">
        <div
          className="z-10 flex justify-between border-b py-1  border-#f1f1f0"
          aria-label="Chatbot Header"
        >
          <div className="flex items-center">
            {storeLogo ? (
              <img
                src={storeLogo ?? ''}
                className="w-8 h-8 mr-2 rounded-full"
                // style={{ backgroundColor: brandColor }}
              />
            ) : (
              <div
                className="w-8 h-8 m-1 mr-2 rounded-full"
                style={{ backgroundColor: brandColor }}
              >
                icon
              </div>
            )}

            <h1 className="text-lg font-bold text-zinc-700">{storeName}</h1>
          </div>
          <div className="flex items-center justify-center">
            {/* <BotHeaderResetChatButton /> */}
            <ChatbotHeaderCloseChatButton
              setIsOpen={setIsOpen}
              brandColor={brandColor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotHeaderContainer;
