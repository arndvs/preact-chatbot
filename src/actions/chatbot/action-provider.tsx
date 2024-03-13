import {
  ComponentChildren,
  FunctionalComponent,
  cloneElement,
  isValidElement
} from 'preact';
import { useEffect, useState } from 'preact/hooks';
import HandleDefaultMessage from 'src/actions/chatbot/handle-messages/handle-default-message';
import { useChatStream } from 'src/hooks/useChatStream';

interface ActionProviderProps {
  createChatBotMessage: any;
  setState: any;
  children?: ComponentChildren;
}

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children
}: ActionProviderProps) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [aiUserTestResponse, setAiUserTestResponse] =
    useState<string>('Loading ...');

  const [activeLoadingMessageIndex, setActiveLoadingMessageIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (loadingState) {
      const botMessage = createChatBotMessage(aiUserTestResponse, {
        loading: activeLoadingMessageIndex === null ? true : false
      });
      setState((prev: any) => {
        const newMessages = [...prev.messages];
        if (activeLoadingMessageIndex !== null) {
          // Update existing loading message
          newMessages[activeLoadingMessageIndex] = botMessage;
        } else {
          // Add new loading message and track its index
          newMessages.push(botMessage);
          setActiveLoadingMessageIndex(newMessages.length - 1);
        }
        return { ...prev, messages: newMessages };
      });
    } else if (activeLoadingMessageIndex !== null) {
      // Reset once streaming ends
      setActiveLoadingMessageIndex(null);
    }
  }, [aiUserTestResponse, loadingState]);

  // instantiate the handleDefaultMessage
  const { handleDefault } = HandleDefaultMessage({
    createChatBotMessage,
    setState,
    loadingState,
    setLoadingState,
    aiUserTestResponse,
    setAiUserTestResponse
  });

  // get the chat stream store and session ID
  useChatStream({
    setAiUserTestResponse,
    setLoadingState,
    setActiveLoadingMessageIndex
  });

  // convert the children prop to an array
  const childElements = Array.isArray(children) ? children : [children];

  return (
    <>
      {childElements.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            actions: {
              handleDefault
            },
            key: index
          });
        }
        return child;
      })}
    </>
  );
};

export default ActionProvider;
