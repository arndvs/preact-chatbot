import ChatbotUserAvatar from 'src/components/chat/chatbot-user-message-container/chatbot-user-avatar';
import ChatbotUserMessage from 'src/components/chat/chatbot-user-message-container/chatbot-user-message';
import { IChatbotUserMessageContainerProps } from 'src/types/IChatbotMessages';

const ChatbotUserMessageContainer = ({
  message,
  customComponents,
  brandColor
}: IChatbotUserMessageContainerProps) => {
  return (
    <div className="flex justify-end">
      <ChatbotUserMessage
        customComponents={customComponents}
        message={message}
        brandColor={brandColor}
      />
      {/* <ChatbotUserAvatar customComponents={customComponents} /> */}
    </div>
  );
};

export default ChatbotUserMessageContainer;
