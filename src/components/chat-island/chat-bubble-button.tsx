import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import * as styles from 'src/styles/chat-widget.css';

interface ChatBubbleButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatBubbleButton = ({ isOpen, setIsOpen }: ChatBubbleButtonProps) => {
  return (
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
  );
};

export default ChatBubbleButton;
