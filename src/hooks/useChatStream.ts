import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, useState } from 'preact/hooks';

interface useChatStreamProps {
  setAiUserTestResponse: (response: string) => void;
  setLoadingState: (state: boolean) => void;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState
}: useChatStreamProps) => {
  const { session_id, store_id, isOpen, setIsOpen } = useChatbotContext();
  const pusher = usePusher();

  // Manage the conversation and its stream
  const [streamedConvo, setStreamedConvo] = useState<
    { text: string; sequence: number }[]
  >([]);
  const [doubleCheck, setDoubleCheck] = useState<{
    text: string;
    sequence: number;
  } | null>(null);

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
          if (data?.completed === true) {
            console.log('Completed', data);
            setDoubleCheck(data);
          }
          if (!isOpen) {
            setIsOpen(true);
          }

          setStreamedConvo((prev) => [
            ...prev,
            { text: data.text, sequence: data.sequence }
          ]);
        }
      );
    }
  }, [pusher, session_id, store_id, setLoadingState]);

  useEffect(() => {
    if (
      doubleCheck &&
      doubleCheck?.sequence === streamedConvo[streamedConvo.length - 1].sequence
    ) {
      console.log('Double check', doubleCheck);
      console.log(
        'Logic',
        doubleCheck?.sequence ===
          streamedConvo[streamedConvo.length - 1].sequence
      );

      setLoadingState(false);
      setStreamedConvo([]);
      setAiUserTestResponse('Complete');
      setDoubleCheck(null);
    }
  }, [doubleCheck]);

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
