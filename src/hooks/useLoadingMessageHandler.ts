import { useEffect } from 'preact/hooks';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface UseLoadingMessageHandlerProps {
  aiUserTestResponse: string;
  setAiUserTestResponse: (value: string) => void;
  loadingState: boolean;
}

export const useLoadingMessageHandler = ({
  aiUserTestResponse,
  loadingState
}: UseLoadingMessageHandlerProps) => {
  const { setMessages } = useChatbotContext();

  useEffect(() => {
    if (loadingState) {
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, loading: false, message: aiUserTestResponse }
            : msg
        );
        return updatedMessages;
      });
    }
  }, [aiUserTestResponse]);
};
