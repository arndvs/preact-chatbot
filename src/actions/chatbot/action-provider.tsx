import axios from 'axios';
import { h, ComponentChildren, FunctionalComponent, Fragment } from 'preact';
import { isValidElement, cloneElement } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from '../../hooks/useChatbotContext';
import Echo from 'laravel-echo';

interface ActionProviderProps {
  createChatBotMessage: any; // Adjust the type as per your requirement
  setState: any; // Adjust the type as per your requirement
  children?: ComponentChildren;
  echo: Echo | null;
}

const ActionProvider: FunctionalComponent<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  echo,
  children
}) => {
  // instantiate the chatbot context
  const { storeName, storeLogo, brandColor, session_id, store_id } =
    useChatbotContext();

  // get the pusher instance
  const pusher = usePusher();
  // set the initial state
  const [aiUserTestResponse, setAiUserTestResponse] = useState('Loading ...');
  const [loadingState, setLoadingState] = useState(false);

  // subscribe to the chatbot channel
  useEffect(() => {
    const subscription = `chat-stream-external-${store_id}-${session_id}`;

    let channel: unknown | null = null;
    if (
      //@ts-ignore
      window.Echo
    ) {
      console.log('user channel is in if:', subscription);
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          console.log('text:', data.text);

          if (data?.completed === false) {
            setAiUserTestResponse((prevResponse) =>
              prevResponse === 'Loading ...'
                ? data.text
                : prevResponse + data.text
            );
          } else if (data?.completed === true) {
            setAiUserTestResponse('Loading ...');
            setLoadingState(false);
          }
        });
      console.log('chatbot response:', channel);
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher]);

  // update the last message for AI streaming
  useEffect(() => {
    if (loadingState) {
      setState((prev: any) => ({
        messages: prev.messages.map((msg: any, index: number) =>
          index === prev.messages.length - 1
            ? {
                ...msg,
                message: aiUserTestResponse
              }
            : msg
        )
      }));
    }
  }, [aiUserTestResponse]);

  console.log('aiUserTestResponse:', aiUserTestResponse);

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  const handleDefault = (message: string) => {
    setLoadingState(true);
    axios.post('https://api.rmdevs.com/api/v2/external_chatbot', {
      question: message,
      store_id: store_id,
      customer_id: 79741,
      req_session: session_id,
      greeting: false
    });
  };

  useEffect(() => {
    if (loadingState) {
      setState(
        (prev: any) => (
          console.log('prev', prev),
          {
            messages: prev.messages.map((msg: any, index: number) =>
              index === prev.messages.length - 1
                ? {
                    ...msg,
                    message: aiUserTestResponse
                  }
                : msg
            )
          }
        )
      );
    }
  }, [aiUserTestResponse]);

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
      {/* <Fragment>
        {Array.isArray(children) &&
          children.map((child) => {
            return h(child.type, {
              ...child.props,
              actions: {
                handleHello,
                handleDefault
              }
            });
          })}
      </Fragment> */}
    </>
  );
};

export default ActionProvider;
