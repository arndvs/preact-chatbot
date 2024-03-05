import axios from 'axios';
import { h, ComponentChildren, FunctionalComponent } from 'preact';
import { isValidElement, cloneElement } from 'preact';

interface ActionProviderProps {
  createChatBotMessage: any; // Adjust the type as per your requirement
  setState: any; // Adjust the type as per your requirement
  children?: ComponentChildren;
}

const ActionProvider: FunctionalComponent<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  children
}) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  const handleDefault = (message: string) => {
    const botMessage = createChatBotMessage(`You said: ${message}`);
    const req = axios.post('https://api.rmdevs.com/api/v2/external_chatbot', {
      question: message,
      store_id: 12,
      customer_id: 79741,
      req_session: '0cGEgXm4oxQxWx6VGnJJyrRKM7cRNlKC0TyzgRHw',
      greeting: false
    });
    req.then((res) => {
      const botMessage = createChatBotMessage(res.data.answer);
      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    });

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  // update the last message for AI streaming
  const updateLastMessage = (message: string) => {
    setState((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev.messages.slice(0, -1),
          { ...prev.messages.at(-1), message }
        ]
      };
    });
  };

  //    then use this inside the action:

  //     let done, value;
  //     let messageBuffer = "";
  //     let decoder = new TextDecoder("utf-8");
  //     addMessageToState(createChatBotMessage("streaming...")) //You need a dummy message to update
  //     while (!done) {
  //       ({ done, value } = await reader.read());
  //       messageBuffer += decoder.decode(value);
  //       updateLastMessage(messageBuffer)
  //     }

  return (
    <>
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                actions: { handleHello },
                key: index
              });
            }
            return child;
          })
        : isValidElement(children)
        ? cloneElement(children, {
            actions: { handleHello, handleDefault }
          })
        : children}
    </>
  );
};

export default ActionProvider;
