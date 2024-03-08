import ChatbotUserMessage from 'src/components/chat/chatbot/chatbot-user-message-container/chatbot-user-message';
import { IChatbotUserMessageContainerProps } from 'src/types/IChatbotMessages';

const ChatbotUserMessageContainer = ({
  message,
  customComponents
}: IChatbotUserMessageContainerProps) => {
  return (
    <div className="flex justify-end ">
      <ChatbotUserMessage
        customComponents={customComponents}
        message={message}
      />
      {/* <ChatbotUserAvatar customComponents={customComponents} /> */}
    </div>
  );
};

export default ChatbotUserMessageContainer;
