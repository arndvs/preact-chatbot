import { useEffect } from 'preact/hooks';

interface UseLoadingMessageHandlerProps {
  setState: any;
  aiUserTestResponse: string;
  setAiUserTestResponse: (value: string) => void;
  loadingState: boolean;
  activeLoadingMessageIndex: number | null;
  setActiveLoadingMessageIndex: (value: number | null) => void;
}

export const useLoadingMessageHandler = ({
  setState,
  aiUserTestResponse,
  loadingState,
  activeLoadingMessageIndex,
  setActiveLoadingMessageIndex
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

  // return {
  //   loadingState,
  //   activeLoadingMessageIndex,
  //   setActiveLoadingMessageIndex
  // };
};
