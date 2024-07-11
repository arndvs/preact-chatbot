import ChatbotAvatar from 'src/components/chat/chatbot/chatbot-avatar';
import ChatbotHeaderCloseChatButton from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-close-chat-button';
import ChatBotHeaderResetChatButton from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-reset-chat-button';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({ setIsOpen }: ChatbotHeaderContainerProps) => {
  const {
    chatHeadingColor,
    chatHeadingFontColor,
    brandColor,
    storeName,
    displayName
  } = useChatbotContext();

  // Determine the background color based on conditions
  const backgroundColor =
    chatHeadingColor != null && chatHeadingColor !== ''
      ? chatHeadingColor
      : brandColor ?? '#e5e5e5';

  // Determine the Display Name based on conditions
  const botName =
    displayName != null && displayName !== '' ? displayName : storeName;

  return (
    <>
      <div
        className="w-full px-3 "
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          className="z-10 flex justify-between py-3"
          aria-label="Chatbot Header"
        >
          <div className="flex items-center">
            <ChatbotAvatar className="w-8 h-8 mr-2 rounded-full" />
            <h1
              className="text-lg font-semibold truncate"
              style={{
                color: chatHeadingFontColor ?? '#fff'
              }}
            >
              {botName}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <ChatBotHeaderResetChatButton />
            <ChatbotHeaderCloseChatButton setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotHeaderContainer;
