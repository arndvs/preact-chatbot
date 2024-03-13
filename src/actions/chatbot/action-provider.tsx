import {
  ComponentChildren,
  FunctionalComponent,
  cloneElement,
  isValidElement
} from 'preact';
import HandleDefaultMessage from 'src/actions/chatbot/handle-messages/handle-default-message';
import { useChatStream } from 'src/hooks/useChatStream';

interface ActionProviderProps {
  createChatBotMessage: any;
  setState: any;
  children?: ComponentChildren;
}

const ActionProvider: FunctionalComponent<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  children
}) => {
  // get the handleDefaultMessage function and state variables
  const { handleDefault, loadingState, aiUserTestResponse } =
    HandleDefaultMessage({
      createChatBotMessage,
      setState
    });

  // get the chat stream store and session ID
  useChatStream();

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
