import { useEffect, useState } from 'react';
import { callIfExists } from 'src/actions/chatbot-message-utils';
import ChatbotLoadingDots from 'src/components/chat/chatbot-loading-dots';
import { IChatbotMessageContainerProps } from 'src/types/IChatbotMessages';
import ChatbotMessageAvatar from './chatbot-message-avatar';

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
        <div className="flex justify-start my-4">
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
              className="relative w-full p-2 ml-auto text-base font-medium text-left text-white bg-blue-500 rounded-md"
              style={chatBoxCustomStyles}
            >
              {loading ? <ChatbotLoadingDots /> : <span>{message}</span>}
              {withAvatar && (
                <div
                  className="absolute w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-blue-500 -left-1/2 top-2"
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
