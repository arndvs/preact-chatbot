import { WebComponentPortal } from 'preact-island';
import { FC } from 'preact/compat';
import ActionProvider from 'src/actions/chatbot/action-provider';
import MessageParser from 'src/actions/chatbot/message-parser';
import { Box } from 'src/components/ui';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import Chatbot from 'src/components/chat/chatbot/chatbot';
import useClassNames from 'src/hooks/useClassNames';
import { useChatbotConfig } from 'src/hooks/useChatbotConfig';

interface ChatModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  islandName: string;
}

const ChatOverlay: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent
}) => {
  useWebComponentEvents(name, parent);

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>;
};

const ChatModal = ({ isOpen, setIsOpen, islandName }: ChatModalProps) => {
  const chatbotConfig = useChatbotConfig();

  return (
    <>
    
      {isOpen && (
        <ChatOverlay
          name="chat-overlay"
          parent={islandName}
        >
          <Box
            data-testId="overlay-content"
            className={useClassNames(
              'z-[888889] border-none fixed flex flex-col justify-between shadow-custom rounded-lg overflow-hidden',
              'lg:w-[28rem] lg:max-h-[86vh] lg:bottom-20 lg:right-4', // Large screens
              'md:w-[28rem] md:max-h-[86vh] md:bottom-20 md:right-4', // Medium screens
              'sm:w-[28rem] sm:max-h-[86vh] sm:bottom-20 sm:right-4', // Small screens
              'xs:w-full xs:h-full xs:bottom-0 xs:right-0', // Extra small screens (mobile)
              'w-full max-w-full max-h-full bottom-0 right-0' // Extra small screens (mobile)
            )}
          >
            {/* Initialize Chatbot, ChatbotConfig, MessageParser, ActionProvider */}
            <Chatbot
              config={chatbotConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </Box>
        </ChatOverlay>
      )}
      {isOpen && (
        <ChatOverlay
          name="chat-overylay-dimmer"
          parent={islandName}
        >
          <Box
            data-testId="overlay-dimmer"
            className={useClassNames(
              'fixed hidden z-[90] top-0 left-0 right-0 bottom-0',
              isOpen && 'hidden sm:block'
            )}
            onClick={() => setIsOpen(false)}
          />
        </ChatOverlay>
      )}
    </>
  );
};

export default ChatModal;
