import { usePusher } from 'src/hooks/usePusher';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useEffect, useState } from 'preact/hooks';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';

interface useChatStreamProps {
  setAiUserTestResponse: (response: string) => void;
  setLoadingState: (state: boolean) => void;
}

export const useChatStream = ({
  setAiUserTestResponse,
  setLoadingState
}: useChatStreamProps) => {
  const { session_id, store_id, isOpen, setIsOpen, setMessages } =
    useChatbotContext();
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
          console.log('isOpen', isOpen);
          console.log('Data', data.completed);
          console.log('Data', data.sequence);

          if (data?.completed === true) {
            setDoubleCheck(data);
          }

          if (data.sequence === 0) {
            setLoadingState(true);
            setAiUserTestResponse('Loading ...');
            const loadingMessage = createChatBotMessage('Loading ...', {
              loading: true,
              delay: 0
            });

            setMessages((prevMessages) => [...prevMessages, loadingMessage]);
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
      setTimeout(() => {
        setLoadingState(false);
        setStreamedConvo([]);
        setAiUserTestResponse('Complete');
        setDoubleCheck(null);
      }, 1000);
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
