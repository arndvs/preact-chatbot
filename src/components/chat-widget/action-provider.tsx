import { h, ComponentChildren, FunctionalComponent } from 'preact';
import { isValidElement, cloneElement } from 'preact';

interface ActionProviderProps {
  createChatBotMessage: any; // Adjust the type as per your requirement
  setState: any; // Adjust the type as per your requirement
  children?: ComponentChildren;
}

const ActionProvider: FunctionalComponent<ActionProviderProps> = ({ createChatBotMessage, setState, children }) => {


    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');

        setState((prev: any) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };



    return (
    <div>
      {Array.isArray(children) ? (
        children.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              actions: {handleHello},
              key: index,
            });
          }
          return child;
        })
      ) : isValidElement(children) ? (
        cloneElement(children, {
          actions: {handleHello},
        })
      ) : (
        children
      )}
    </div>
  );
};

export default ActionProvider;
