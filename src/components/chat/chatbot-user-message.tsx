import React from 'react';

import { callIfExists } from 'src/utils/chatbot-message-utils';

// import UserIcon from 'src/assets/icons/user-alt.svg';

import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';
import * as styles from 'src/styles/ChatWidget.css';

interface IChatbotUserMessageProps {
  message: string;
  customComponents: IChatbotCustomComponents;
}

const ChatbotUserMessage = ({
  message,
  customComponents
}: IChatbotUserMessageProps) => {
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
          <img
            src="src/assets/icons/user-alt.svg"
            className={styles.UserAvatarIcon}
            alt="User Avatar"
          />
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

export default ChatbotUserMessage;
