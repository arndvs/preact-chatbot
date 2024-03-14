import { useState, useEffect } from 'preact/hooks';

interface UseLoadingMessageHandlerProps {
  createChatBotMessage: any;
  setState: any;
  aiUserTestResponse: string;
  setAiUserTestResponse: (value: string) => void;
  loadingState: boolean;
  activeLoadingMessageIndex: number | null;
  setActiveLoadingMessageIndex: (value: number | null) => void;
}

export const useLoadingMessageHandler = ({
  createChatBotMessage,
  setState,
  aiUserTestResponse,
  loadingState,
  activeLoadingMessageIndex,
  setActiveLoadingMessageIndex
}: UseLoadingMessageHandlerProps) => {
  useEffect(() => {
    if (loadingState) {
      const botMessage = createChatBotMessage(aiUserTestResponse, {
        loading: activeLoadingMessageIndex === null ? true : false
      });
      setState((prev: any) => {
        const newMessages = [...prev.messages];
        if (activeLoadingMessageIndex !== null) {
          // Update existing loading message
          newMessages[activeLoadingMessageIndex] = botMessage;
        } else {
          // Add new loading message and track its index
          newMessages.push(botMessage);
          setActiveLoadingMessageIndex(newMessages.length - 1);
        }
        return { ...prev, messages: newMessages };
      });
    } else if (activeLoadingMessageIndex !== null) {
      // Reset once streaming ends
      setActiveLoadingMessageIndex(null);
    }
  }, [aiUserTestResponse, loadingState]);

  return {
    loadingState,
    activeLoadingMessageIndex,
    setActiveLoadingMessageIndex
  };
};
