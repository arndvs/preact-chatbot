import { useEffect, useState } from 'react';
import { callIfExists } from 'src/actions/chatbot/chatbot-message-utils';
import ChatbotLoadingDots from 'src/components/chat/chatbot/chatbot-loading-dots';
import ChatbotMessageAvatar from 'src/components/chat/chatbot/chatbot-message-container/chatbot-message-avatar';
import ChatbotMessageComponent from 'src/components/chat/chatbot/chatbot-message-container/chatbot-message-component';
import { IChatbotMessageContainerProps } from 'src/types/IChatbotMessages';

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
        <div className="flow-root">
          <div className="relative">

            <div className="relative flex items-start space-x-3">
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
                <ChatbotMessageComponent
                  loading={loading}
                  message={message}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotMessageContainer;
