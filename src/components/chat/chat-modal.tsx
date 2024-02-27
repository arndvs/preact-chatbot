import { WebComponentPortal } from 'preact-island';

import { FC } from 'preact/compat';
import ActionProvider from 'src/actions/action-provider';
import MessageParser from 'src/actions/message-parser';
import { Box } from 'src/components/ui';
import ChatbotConfig from 'src/utils/chatbot-config';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import * as styles from 'src/styles/chat-overlay.css';
import ChatbotWidget from 'src/components/chat/chatbot-widget';

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ChatModal = ({ isOpen, setIsOpen, islandName }: ChatModalProps) => {
  return (
    <>
      {isOpen && (
        <ChatOverlay
          name="chat-overlay"
          parent={islandName}
        >
          <Box
            data-testId="overlay-content"
            className={classNames(
              isOpen && styles.chatOverlayVisible,
              'z-[888889] border-none fixed flex flex-col w-[28rem] justify-between shadow-lg bottom-20 right-4 h-85vh max-h-824 rounded-lg overflow-hidden bg-white"'
            )}
          >
            <ChatbotWidget
              config={ChatbotConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
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
            className={classNames(
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
