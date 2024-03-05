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
              isOpen && 'hidden sm:block',
              'z-[888889] border-none fixed flex flex-col w-[28rem] justify-between shadow-custom bottom-20 right-4 h-85vh max-h-824 rounded-lg overflow-hidden bg-white"'
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
