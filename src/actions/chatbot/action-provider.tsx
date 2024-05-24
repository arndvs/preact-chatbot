import { ComponentChildren, cloneElement, isValidElement } from 'preact';
import { useState } from 'preact/hooks';
import { useChatStream } from 'src/hooks/useChatStream';
import { useLoadingMessageHandler } from 'src/hooks/useLoadingMessageHandler';

interface ActionProviderProps {
  children?: ComponentChildren;
}

const ActionProvider = ({ children }: ActionProviderProps) => {
  // handle loading state
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // handle loading messages state
  const [aiUserTestResponse, setAiUserTestResponse] =
    useState<string>('Loading ...');

  // hook to handle loading messages
  useLoadingMessageHandler({
    loadingState,
    aiUserTestResponse
  });

  // // get the chat stream store and session ID
  useChatStream({
    setAiUserTestResponse,
    setLoadingState
  });

  // convert the children prop to an array
  const childElements = Array.isArray(children) ? children : [children];
  return (
    <>
      {childElements.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            actions: {
              // handleDefault
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
