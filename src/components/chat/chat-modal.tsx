import { WebComponentPortal } from 'preact-island';

import cx from 'clsx';
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

const ChatModal = ({ isOpen, setIsOpen, islandName }: ChatModalProps) => {
  return (
    <>
      <ChatbotWidget
        config={ChatbotConfig}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      {isOpen && (
        <ChatOverlay
          name="chat-overlay"
          parent={islandName}
        >
          <Box
            data-testId="overlay-content"
            className={cx(
              styles.chatOverlay,
              isOpen && styles.chatOverlayVisible
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
            className={cx(
              styles.chatOverlayDimmer,
              isOpen && styles.chatOverlayDimmerVisible
            )}
            onClick={() => setIsOpen(false)}
          />
        </ChatOverlay>
      )}
    </>
  );
};

export default ChatModal;
