import { WebComponentPortal } from 'preact-island';

import cx from 'clsx';
import { FC } from 'preact/compat';
import ChatbotActionProvider from 'src/actions/chatbot-action-provider';
import ChatbotMessageParser from 'src/actions/chatbot-message-parser';
import { Box } from 'src/components/ui';
import Chatbot from 'src/components/chat-island/Chatbot';
import ChatConfig from 'src/components/chat-island/chat-config';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import * as styles from 'src/styles/chat-widget.css';
import ChatBot from 'src/components/chat-island/chat-bot';

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
            <ChatBot />
            <Chatbot
              config={ChatConfig}
              chatbotMessageParser={ChatbotMessageParser}
              chatbotActionProvider={ChatbotActionProvider}
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
