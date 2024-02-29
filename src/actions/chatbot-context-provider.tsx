import { ChatbotContext } from 'src/actions/chatbot-context';
import type { ComponentChildren } from 'preact';

interface ChatbotContextProviderProps {
  children: ComponentChildren;
  storeName: string;
  storeLogo: string;
  brandColor: string;
}

export const ChatbotContextProvider = ({
  children,
  ...props
}: ChatbotContextProviderProps) => {
  // You can include state management logic here if needed

  return (
    <ChatbotContext.Provider value={{ ...props }}>
      {children}
    </ChatbotContext.Provider>
  );
};
