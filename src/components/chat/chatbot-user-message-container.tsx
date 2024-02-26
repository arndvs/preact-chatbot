import { callIfExists } from 'src/actions/chatbot-message-utils';
import { UserIcon } from 'src/assets/user-icon';
import { IChatbotUserMessageContainerProps } from 'src/types/IChatbotMessages';

const ChatbotUserMessageContainer = ({
  message,
  customComponents
}: IChatbotUserMessageContainerProps) => {
  const renderChatbotUserMessage = () => {
    if (customComponents.userChatMessage) {
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

  const renderUserAvatar = () => {
    if (customComponents.userAvatar) {
      return callIfExists(customComponents.userAvatar);
    } else {
      return (
        <div className="flex items-center justify-center w-10 h-10 ml-3 bg-indigo-700 rounded-full">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
      );
    }
  };

  return (
    <div className="flex justify-end my-4">
      {renderChatbotUserMessage()}
      {renderUserAvatar()}
    </div>
  );
};

export default ChatbotUserMessageContainer;
