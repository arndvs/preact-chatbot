import { useState, useEffect } from 'preact/hooks';
import Echo from 'laravel-echo';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { usePusher } from 'src/hooks/usePusher';

export const useChatEchoSubscription = (echo: Echo | null, setState: any) => {
  // instantiate the chatbot context
  const { session_id, store_id } = useChatbotContext();

  const [aiUserTestResponse, setAiUserTestResponse] = useState('Loading ...');
  const [loadingState, setLoadingState] = useState(false);

  const pusher = usePusher();

  useEffect(() => {
    const subscription = `chat-stream-external-${store_id}-${session_id}`;

    let channel: unknown | null = null;

    if (
      //@ts-ignore
      window.Echo !== undefined &&
      //@ts-ignore
      window.Echo !== null
    ) {
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          console.log('chatbot response text:', data.text);
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
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher]);

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

  return { aiUserTestResponse, loadingState };
};
