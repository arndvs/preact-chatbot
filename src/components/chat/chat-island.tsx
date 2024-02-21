import { WebComponentPortal } from 'preact-island';

import cx from 'clsx';
import { FC, useState } from 'preact/compat';
import ActionProvider from 'src/actions/action-provider';
import MessageParser from 'src/actions/message-parser';
import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import { Box } from 'src/components/_shared';
import ChatConfig from 'src/components/chat-widget/chat-config';
import Chatbot from 'src/components/chat-widget/Chatbot/Chatbot';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import * as styles from 'src/styles/chat-widget.css';
import { IIsland } from 'src/types/IIsland';

const Portalize: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent
}) => {
  useWebComponentEvents(name, parent);

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>;
};

interface ChatIslandProps {
  islandName: IIsland['name'];
}

const ChatIsland = ({ islandName }: ChatIslandProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useWebComponentEvents(islandName);

  return (
    <>
      <button
        className={styles.chatBubbleButton}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="chat-bubble-button"
      >
        <div className={styles.chatBubbleButtonContent}>
          {!isOpen ? (
            <ChatIcon
              className={styles.chatBubbleButtonImage}
              aria-hidden="true"
            />
          ) : (
            <XMarkIcon
              className={styles.chatBubbleButtonImage}
              aria-hidden="true"
            />
          )}
        </div>
      </button>
      {isOpen && (
        <Portalize
          name="chat-dialog"
          parent={islandName}
        >
          <Box
            data-testId="modal-content"
            className={cx(
              styles.chatDialog,
              isOpen && styles.chatDialogVisible
            )}
          >
            <Chatbot
              config={ChatConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </Box>
        </Portalize>
      )}
      {isOpen && (
        <Portalize
          name="chat-dialog-dimmer"
          parent={islandName}
        >
          <Box
            data-testId="modal-dimmer"
            className={cx(
              styles.chatDialogDimmer,
              isOpen && styles.chatDialogDimmerVisible
            )}
            onClick={() => setIsOpen(false)}
          />
        </Portalize>
      )}
    </>
  );
};

export default ChatIsland;
