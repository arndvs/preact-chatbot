import {
  ComponentChildren,
  FunctionalComponent,
  cloneElement,
  isValidElement
} from 'preact';
import { useEffect } from 'preact/hooks';
import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

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
  const childElements = Array.isArray(children) ? children : [children];

  const { session_id, store_id } = useChatbotContext();
  const pusher = usePusher();

  useEffect(() => {
    const subscription = `chat-stream-external-${store_id}-${session_id}`;
    // console.log('user channel ID', subscription);
    let channel: unknown | null = null;

    if (
      //@ts-ignore
      window.Echo
    ) {
      // console.log('user channel is in if:', subscription);
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          console.log('chatbot response:', e);
          // console.log('text:', data.text);s

          // if (data?.completed === false) {
          //   setAiUserTestResponse((prevResponse) =>
          //     prevResponse === 'Loading ...'
          //       ? data.text
          //       : prevResponse + data.text
          //   );
          // } else if (data?.completed === true) {
          //   setAiUserTestResponse('Loading ...');
          //   setLoadingState(false);
          // }
        });
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher]);

  const handleDefault = (message: string) => {
    const botMessage = createChatBotMessage(`You said: ${message}`);
    // const req = axios.post('https://api.rmdevs.com/api/v2/external_chatbot', {
    //   question: message,
    //   store_id: 12,
    //   customer_id: 79741,
    //   req_session: '0cGEgXm4oxQxWx6VGnJJyrRKM7cRNlKC0TyzgRHw',
    //   greeting: false
    // });
    // req.then((res) => {
    //   const botMessage = createChatBotMessage(res.data.answer);
    //   setState((prev: any) => ({
    //     ...prev,
    //     messages: [...prev.messages, botMessage]
    //   }));
    // });

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

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
      {/* {Array.isArray(children)
        ? children.map((child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                actions: { handleDefault },
                key: index
              });
            }
            return child;
          })
        : isValidElement(children)
        ? cloneElement(children, {
            actions: { handleDefault }
          })
        : children} */}
    </>
  );
};

export default ActionProvider;
