import { useEffect, useState } from 'react';
import ChatbotMessageAvatar from './chatbot-message-avatar';
import ChatbotLoadingDots from 'src/components/chat/chatbot-loading-dots';
import * as styles from 'src/styles/chat-widget.css';
import { IChatbotMessageContainerProps } from 'src/types/IChatbotMessages';
import { callIfExists } from 'src/utils/chatbot-message-utils';

const ChatbotMessageContainer = ({
  message,
  withAvatar = true,
  loading,
  messages,
  customComponents,
  setState,
  customStyles,
  delay,
  id
}: IChatbotMessageContainerProps) => {
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    const disableLoading = (messages: any[], setState: any) => {
      let defaultDisableTime = 750;
      if (delay) defaultDisableTime += delay;

      timeoutId = setTimeout(() => {
        const newMessages = [...messages].map((message) => {
          if (message.id === id) {
            return { ...message, loading: false, delay: undefined };
          }

          return message;
        });

        setState((state: any) => ({ ...state, messages: newMessages }));
      }, defaultDisableTime);
    };

    disableLoading(messages, setState);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, id]);

  useEffect(() => {
    if (delay) {
      setTimeout(() => toggleShow(true), delay);
    } else {
      toggleShow(true);
    }
  }, [delay]);

  const chatBoxCustomStyles = { backgroundColor: '' };
  const arrowCustomStyles = { borderRightColor: '' };

  if (customStyles) {
    chatBoxCustomStyles.backgroundColor = customStyles.backgroundColor;
    arrowCustomStyles.borderRightColor = customStyles.backgroundColor;
  }

  return (
    <>
      {show && (
        <div className={styles.ChatBotMessageContainer}>
          {withAvatar && customComponents?.botAvatar ? (
            callIfExists(customComponents.botAvatar)
          ) : (
            <ChatbotMessageAvatar />
          )}

          {customComponents?.botChatMessage ? (
            callIfExists(customComponents.botChatMessage, {
              message,
              loader: <ChatbotLoadingDots />
            })
          ) : (
            <div
              className={styles.ChatBotMessage}
              style={chatBoxCustomStyles}
            >
              {loading ? <ChatbotLoadingDots /> : <span>{message}</span>}
              {withAvatar && (
                <div
                  className={styles.ChatBotMessageArrow}
                  style={arrowCustomStyles}
                ></div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotMessageContainer;
