import React from 'react';

import ChatbotMessage from '../ChatbotMessage/ChatbotMessage';
import * as styles from '../../../styles/ChatWidget.css';



interface IChatbotErrorProps {
  message: string;
}

const ChatbotError = ({ message }: IChatbotErrorProps) => {
  return (
    <div className={styles.Error}>
      <h1 className={styles.ErrorHeader}>
        Ooops. Something is missing.
      </h1>
      <div className={styles.ErrorContainer}>
        <ChatbotMessage
          message={message}
          withAvatar
          loading={false}
          id={1}
          customStyles={{ backgroundColor: '' }}
          messages={[]}
        />
      </div>
      <a
        href="https://fredrikoseberg.github.io/react-chatbot-kit-docs/"
        rel="noopener norefferer"
        target="_blank"
        className="react-chatbot-kit-error-docs"
      >
        View the docs
      </a>
    </div>
  );
};

export default ChatbotError;
