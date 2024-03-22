import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, StateUpdater } from 'preact/hooks';

interface useChatStreamProps {
  setAiUserTestResponse: StateUpdater<string>;
  setLoadingState: StateUpdater<boolean>;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState
}: useChatStreamProps) => {
  const { session_id, store_id } = useChatbotContext();
  const pusher = usePusher();

  useEffect(() => {
    // const subscription = `chat-stream-external-${store_id}-${session_id}`;
    const subscription = `heartbeat`;

    let channel: unknown | null = null;

    if (
      //@ts-ignore
      window.Echo
    ) {
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          console.log('Chat stream data:', data);
          if (data?.completed === false) {
            console.log('useChatStream - data?.completed === false :', data);
            setAiUserTestResponse((prevResponse: string) =>
              prevResponse === 'Loading ...'
                ? data.text
                : prevResponse + data.text
            );
          } else if (data?.completed === true) {
            console.log('useChatStream - data?.completed === true :', data);
            setAiUserTestResponse('Loading ...');
            setLoadingState(false);
          }
        });
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher, session_id]);
};
