import { FunctionalComponent, h, ComponentChildren, cloneElement, VNode } from 'preact';

interface MessageParserProps {
  actions: {
    handleHello: () => void;
    handleMenu: () => void;
    handleHoursLocation: () => void;
    // handleDeals: () => void;
    handleDefault: (message: string) => void;
  };
  children?:
    | ComponentChildren
    | readonly ComponentChildren[];
}

const MessageParser: FunctionalComponent<MessageParserProps> = ({
  children = null,
  actions,
  ...props
}) => {
  const parse = (message: string): void => {
    console.log('parse message', message);
    const lowerCaseMessage = message.toLowerCase();

    if (message.includes('hello')) {
        actions.handleHello();
      }

    if (message.includes('hello')) {
        console.log('hi');
      }

    if (lowerCaseMessage.includes('menu')) {
      actions.handleMenu();
      return;
    }

    if (lowerCaseMessage.includes('feedback')) {
      actions.handleMenu();
      return;
    }

    if (
      lowerCaseMessage.includes('hours') ||
      lowerCaseMessage.includes('location')
    ) {
      actions.handleHoursLocation();
      return;
    }

    actions.handleDefault(message);
  };

  // Filter out non-VNode elements from children
  const vnodeChildren = (Array.isArray(children) ? children : [children]).filter(child => typeof child === 'object' && 'type' in child) as VNode[];

  return (
    <div>
      {vnodeChildren.map((child: VNode) => {
        return cloneElement(child, {
            parse: parse,
          actions,
          ...props
        });
      })}
    </div>
  );
};

export default MessageParser;
