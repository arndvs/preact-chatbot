import {
  FunctionalComponent,
  h,
  ComponentChildren,
  cloneElement,
  VNode
} from 'preact';

interface MessageParserProps {
  actions: {
    // handleHello: () => void;
    // handleMenu: () => void;
    // handleHoursLocation: () => void;
    // // handleDeals: () => void;
    handleDefault: (message: string) => void;
  };
  children?: ComponentChildren | readonly ComponentChildren[];
}

const MessageParser: FunctionalComponent<MessageParserProps> = ({
  children = null,
  actions,
  ...props
}) => {
  const parse = (message: string): void => {
    const lowerCaseMessage = message.toLowerCase();

    actions.handleDefault(message);
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
