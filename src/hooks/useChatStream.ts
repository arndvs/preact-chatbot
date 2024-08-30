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
    { text: string; sequence: number; completed: boolean }[]
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
            {
              text: data.text,
              sequence: data.sequence,
              completed: data.completed
            }
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
      const isCompleted = orderedConvo[orderedConvo.length - 1].completed;

      setAiUserTestResponse(text);
      setLoadingState(!isCompleted);

      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.loading) {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            message: text,
            loading: false,
            completed: isCompleted
          };
          return updatedMessages;
        }
        return prevMessages;
      });
    }
  }, [streamedConvo]);
};
