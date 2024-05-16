import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, useState } from 'preact/hooks';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

interface useChatStreamProps {
  setAiUserTestResponse: (response: string) => void;
  setLoadingState: (state: boolean) => void;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState
}: useChatStreamProps) => {
  const { session_id, store_id } = useChatbotContext();
  const pusher = usePusher();

  // Manage the conversation and its stream
  const [streamedConvo, setStreamedConvo] = useState<
    { text: string; sequence: number }[]
  >([]);

  useEffect(() => {
    if (session_id && store_id) {
      //@ts-ignore
      const channel = window.Echo?.private(
        `chat-stream-external-${store_id}-${session_id}`
      );

      channel.listenToAll(
        (
          event: string,
          data: {
            text: string;
            sequence: number;
            completed: boolean;
          }
        ) => {
          console.log('Received event:', data);
          if (data?.completed === false) {
            setStreamedConvo((prev) => [
              ...prev,
              { text: data.text, sequence: data.sequence }
            ]);
          } else {
            setLoadingState(false);
            setStreamedConvo([]);
            setAiUserTestResponse('Complete');
          }
        }
      );
    }
  }, [pusher, session_id, store_id, setLoadingState]);

  useEffect(() => {
    if (streamedConvo.length > 0) {
      // Sort conversation pieces by sequence to ensure correct order
      const orderedConvo = streamedConvo.sort(
        (a, b) => a.sequence - b.sequence
      );
      // Join texts into a single message
      const text = orderedConvo.map((item) => item.text).join('');

      setAiUserTestResponse(text);
      setLoadingState(true); // Possibly indicate loading of the message is complete
    }
  }, [streamedConvo]);
};
