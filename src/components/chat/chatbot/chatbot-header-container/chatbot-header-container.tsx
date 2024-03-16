import ChatbotHeaderAvatar from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-avatar';
import ChatbotHeaderCloseChatButton from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-close-chat-button';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({ setIsOpen }: ChatbotHeaderContainerProps) => {
  const { brandColor } = useChatbotContext();

  return (
    <>
      <div
        className="w-full px-3 "
        style={{ backgroundColor: brandColor }}
      >
        <div
          className="z-10 flex justify-between py-3"
          aria-label="Chatbot Header"
        >
          <ChatbotHeaderAvatar />
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
