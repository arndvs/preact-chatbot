import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, StateUpdater } from 'preact/hooks';

interface useChatStreamProps {
  setAiUserTestResponse: StateUpdater<string>;
  setLoadingState: StateUpdater<boolean>;
  setActiveLoadingMessageIndex: StateUpdater<number | null>;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState,
  setActiveLoadingMessageIndex
}: useChatStreamProps) => {
  const { session_id, store_id } = useChatbotContext();
  const pusher = usePusher();

  useEffect(() => {
    const subscription = `chat-stream-external-${store_id}-${session_id}`;

    let channel: unknown | null = null;

    if (
      //@ts-ignore
      window.Echo
    ) {
      channel =
        //@ts-ignore
        window.Echo.private(subscription).listenToAll((e, data) => {
          if (data?.completed === false) {
            setAiUserTestResponse((prevResponse: string) =>
              prevResponse === 'Loading ...'
                ? data.text
                : prevResponse + data.text
            );
          } else if (data?.completed === true) {
            setAiUserTestResponse('Loading ...');
            setLoadingState(false);
            setActiveLoadingMessageIndex(null);
          }
        });
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher]);
};
