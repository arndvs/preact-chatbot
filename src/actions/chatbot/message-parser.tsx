import {
  FunctionalComponent,
  h,
  ComponentChildren,
  cloneElement,
  VNode
} from 'preact';
import HandleDefaultMessage from 'src/actions/chatbot/handle-messages/handle-default-message';

interface MessageParserProps {
  actions: {
    // handleHello: () => void;
    // handleMenu: () => void;
    // handleHoursLocation: () => void;
    // // handleDeals: () => void;
    // handleDefault: (message: string) => void;
  };
  children?: ComponentChildren | readonly ComponentChildren[];
}

const MessageParser: FunctionalComponent<MessageParserProps> = ({
  children = null,
  actions,
  ...props
}) => {
  // instantiate the handleDefaultMessage
  const { handleDefault } = HandleDefaultMessage();

  const parse = (message: string): void => {
    handleDefault(message);
  };

  // Filter out non-VNode elements from children
  const vnodeChildren = (
    Array.isArray(children) ? children : [children]
  ).filter((child) => typeof child === 'object' && 'type' in child) as VNode[];

  return (
    <>
      {vnodeChildren.map((child: VNode) => {
        return cloneElement(child, {
          parse: parse,
          actions,
          ...props
        });
      })}
    </>
  );
};

export default MessageParser;
