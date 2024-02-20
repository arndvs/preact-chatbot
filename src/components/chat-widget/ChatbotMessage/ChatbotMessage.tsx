import React, { useEffect, useState } from 'react';


import ChatbotMessageAvatar from './ChatBotMessageAvatar/ChatbotMessageAvatar';
import Loader from '../Loader/Loader';


import { callIfExists } from '../Chat/chatUtils';
import { ICustomComponents, ICustomStyles } from 'src/interfaces/IConfig';
import { reactChatbotKitChatBotMessage, reactChatbotKitChatBotMessageArrow, reactChatbotKitChatBotMessageContainer } from '../ChatWidget.css';

interface IChatbotMessageProps {
  message: string;
  withAvatar?: boolean;
  loading?: boolean;
  messages: any[];
  delay?: number;
  id: number;
  setState?: any;
  customComponents?: ICustomComponents;
  customStyles?: { backgroundColor: string };
}
const ChatbotMessage = ({
  message,
  withAvatar = true,
  loading,
  messages,
  customComponents,
  setState,
  customStyles,
  delay,
  id,
}: IChatbotMessageProps) => {
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    const disableLoading = (
      messages: any[],
      setState: any
    ) => {
      let defaultDisableTime = 750;
      if (delay) defaultDisableTime += delay;

      timeoutId = setTimeout(() => {
        const newMessages = [...messages].map(message => {
          if (message.id === id) {
            return {...message, loading: false, delay: undefined};
          }

          return message;
        });

        setState((state: any) => ({...state, messages: newMessages}));
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

      <div className={reactChatbotKitChatBotMessageContainer}>
         {withAvatar && customComponents?.botAvatar ? (
            callIfExists(customComponents.botAvatar)
          ) : (
            <ChatbotMessageAvatar />
          )}

        {customComponents?.botChatMessage ? (
            callIfExists(customComponents.botChatMessage, {
              message,
              loader: <Loader />,
            })
          ) : (
            <div
              className={reactChatbotKitChatBotMessage}
              style={chatBoxCustomStyles}
            >
               {loading ? <Loader /> : <span>{message}</span>}
               {withAvatar && (
                <div
                  className={reactChatbotKitChatBotMessageArrow}
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

export default ChatbotMessage;
