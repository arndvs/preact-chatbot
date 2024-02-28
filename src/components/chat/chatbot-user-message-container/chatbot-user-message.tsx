import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';
import { callIfExists } from 'src/actions/chatbot-message-utils';

interface ChatbotUserMessageProps {
  customComponents?: IChatbotCustomComponents;
  message: string;
}

const ChatbotUserMessage = ({
  customComponents,
  message
}: ChatbotUserMessageProps) => {
  if (customComponents?.userChatMessage) {
    return callIfExists(customComponents.userChatMessage, { message });
  } else {
    return (
      <div className="relative p-2 text-sm font-medium text-left text-gray-700 bg-gray-200 rounded-md">
        {message}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-b-8 border-l-8 border-gray-200"></div>
      </div>
    );
  }
};

export default ChatbotUserMessage;
