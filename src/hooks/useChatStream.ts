import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, StateUpdater, useState } from 'preact/hooks';

interface useChatStreamProps {
  setAiUserTestResponse: StateUpdater<string>;
  setLoadingState: StateUpdater<boolean>;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState
}: useChatStreamProps) => {
  const { session_id, store_id, islandName } = useChatbotContext();

  const pusher = usePusher();

  const [completed, setCompleted] = useState(true);
  const [streamedConvo, setStreamedConvo] = useState<
    { text: string; sequence: number }[]
  >([]);

  console.log('useChatStream - completed:', completed);
  console.log('useChatStream - streamedConvo:', streamedConvo);
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
          console.log('Chat stream data:', data);
          if (data?.completed === false) {
            setStreamedConvo((prev) => [
              ...prev,
              { text: data.text, sequence: data.sequence }
            ]);
          } else {
            setCompleted(true);
            setStreamedConvo([]);
          }

          // console.log(`${islandName} - Chat stream data:`, data);
          // if (data?.completed === false) {
          //   setAiUserTestResponse((prevResponse: string) =>
          //     prevResponse === 'Loading ...'
          //       ? data.text
          //       : prevResponse + data.text
          //   );
          // } else if (data?.completed === true) {
          //   setAiUserTestResponse('Loading ...');
          //   setLoadingState(false);
          // } else {
          //   console.log('useChatStream - else :', data);
          // }
        });
    }

    return () => {
      //@ts-ignore
      channel?.unsubscribe();
    };
  }, [pusher, session_id]);

  useEffect(() => {
    if (!completed && streamedConvo.length > 0) {
      const orderedConvo = streamedConvo.sort(
        (a, b) => a.sequence - b.sequence
      );
      const text = orderedConvo.map((item) => item.text).join('');
      setAiUserTestResponse((prevResponse) => {
        return prevResponse === 'Loading ...' ? text : prevResponse + text;
        // Ensure we only update the last assistant message
        // return prevConversation.map((item, idx, arr) =>
        //   idx === arr.length - 1 && item.role === 'assistant'
        //     ? { ...item, text }
        //     : item
        // );
      });
      setLoadingState(false);
    }
  }, [streamedConvo, completed]);
};
