import {
  ComponentChildren,
  FunctionalComponent,
  cloneElement,
  isValidElement
} from 'preact';
import { useEffect, useState } from 'preact/hooks';
import HandleDefaultMessage from 'src/actions/chatbot/handle-messages/handle-default-message';
import { useChatStream } from 'src/hooks/useChatStream';
import { useLoadingMessageHandler } from 'src/hooks/useLoadingMessageHandler';

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
  // handle loading state
  const [loadingState, setLoadingState] = useState<boolean>(false);
  // handle loading messages state
  const [aiUserTestResponse, setAiUserTestResponse] =
    useState<string>('Loading ...');
  // handle loading messages state
  const [activeLoadingMessageIndex, setActiveLoadingMessageIndex] = useState<
    number | null
  >(null);

  // hook to handle loading messages
  useLoadingMessageHandler({
    loadingState,
    createChatBotMessage,
    setState,
    aiUserTestResponse,
    setAiUserTestResponse,
    activeLoadingMessageIndex,
    setActiveLoadingMessageIndex
  });

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
