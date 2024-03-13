import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect } from 'preact/hooks';

export const useChatStream = () => {
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
};
