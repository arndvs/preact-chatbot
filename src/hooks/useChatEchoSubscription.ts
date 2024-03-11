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
    // console.log('user channel ID', subscription);
    let channel: unknown | null = null;
    console.log('echo', echo);
    if (
      //@ts-ignore
      echo !== undefined &&
      echo !== null
    ) {
      // console.log('user channel is in if:', subscription);
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          console.log('chatbot response:', e);
          // console.log('text:', data.text);s

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

  console.log('aiUserTestResponse:', aiUserTestResponse);

  return { aiUserTestResponse, loadingState };
};
