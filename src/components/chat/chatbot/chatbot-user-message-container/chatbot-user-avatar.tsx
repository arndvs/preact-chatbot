import { UserIcon } from 'src/assets/user-icon';
import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';
import { callIfExists } from 'src/actions/chatbot/chatbot-message-utils';

interface ChatbotUserAvatarProps {
  customComponents?: IChatbotCustomComponents;
}

const ChatbotUserAvatar = ({ customComponents }: ChatbotUserAvatarProps) => {
  // Define the function to call custom components if they exist
  if (customComponents?.userAvatar) {
    return callIfExists(customComponents.userAvatar);
  } else {
    return (
      <div className="flex items-center justify-center w-10 h-10 ml-3 rounded-full">
        <UserIcon className="w-4 h-4 text-white" />
      </div>
    );
  }
};

export default ChatbotUserAvatar;
