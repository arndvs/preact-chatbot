import { useEffect } from 'preact/hooks';

interface UseLoadingMessageHandlerProps {
  setState: any;
  aiUserTestResponse: string;
  setAiUserTestResponse: (value: string) => void;
  loadingState: boolean;
}

export const useLoadingMessageHandler = ({
  setState,
  aiUserTestResponse,
  loadingState
}: UseLoadingMessageHandlerProps) => {
  useEffect(() => {
    if (loadingState) {
      setState((prev: any) => ({
        messages: prev.messages.map((msg: any, index: number) =>
          index === prev.messages.length - 1
            ? {
                ...msg,
                message: aiUserTestResponse
              }
            : msg
        )
      }));
    }
  }, [aiUserTestResponse]);
};
