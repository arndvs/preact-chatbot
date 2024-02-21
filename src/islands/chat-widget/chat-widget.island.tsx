import { createIslandWebComponent, WebComponentPortal } from 'preact-island';

import cx from 'clsx';
import { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import { Box } from 'src/components/_shared';
import ActionProvider from 'src/components/chat-widget/action-provider';
import ChatConfig from 'src/components/chat-widget/chat-config';
import Chatbot from 'src/components/chat-widget/Chatbot/Chatbot';
import MessageParser from 'src/components/chat-widget/message-parser';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import * as styles from 'src/styles/chat-widget.css';

const Portalize: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent
}) => {
  useWebComponentEvents(name, parent);

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  useWebComponentEvents(islandName);

  return (
    <>
      <div>
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
              <>
                <XMarkIcon
                  className={styles.chatBubbleButtonImage}
                  aria-hidden="true"
                />
              </>
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
      </div>
    </>
  );
};

const islandName = 'chat-widget-island';

const island = createIslandWebComponent(islandName, ChatWidget);
island.render({
  selector: islandName
});
