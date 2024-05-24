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
  const { session_id, store_id, setIsOpen, setMessages } = useChatbotContext();
  const pusher = usePusher();

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
          console.log('Data', data.completed);
          console.log('Data', data.sequence);

          if (data.sequence === 0) {
            setStreamedConvo([]);
            setAiUserTestResponse('');
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
    if (streamedConvo.length === 1) {
      setIsOpen(true);
    }
    if (streamedConvo.length > 0) {
      const orderedConvo = streamedConvo.sort(
        (a, b) => a.sequence - b.sequence
      );
      const text = orderedConvo.map((item) => item.text).join('');

      setAiUserTestResponse(text);
      setLoadingState(true);
    }
  }, [streamedConvo]);
};
