import { UserIcon } from 'src/assets/user-icon';
import * as styles from 'src/styles/chat-widget.css';
import { IChatbotUserMessageContainerProps } from 'src/types/IChatbotMessages';
import { callIfExists } from 'src/actions/chatbot-message-utils';

const ChatbotUserMessageContainer = ({
  message,
  customComponents
}: IChatbotUserMessageContainerProps) => {
  const renderChatbotUserMessage = () => {
    if (customComponents.userChatMessage) {
      return callIfExists(customComponents.userChatMessage, { message });
    } else {
      return (
        <div className={styles.ChatbotUserMessage}>
          {message}
          <div className={styles.ChatbotUserMessageArrow}></div>
        </div>
      );
    }
  };

  const renderUserAvatar = () => {
    if (customComponents.userAvatar) {
      return callIfExists(customComponents.userAvatar);
    } else {
      return (
        <div className={styles.UserAvatarContainer}>
          <UserIcon className={styles.UserAvatarIcon} />
        </div>
      );
    }
  };

  return (
    <div className={styles.ChatbotUserMessageContainer}>
      {renderChatbotUserMessage()}
      {renderUserAvatar()}
    </div>
  );
};

export default ChatbotUserMessageContainer;
