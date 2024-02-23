import * as styles from 'src/styles/chat-widget.css';
import { ChatbotMessageContainerProps } from 'src/types/IChatbotWidget';

const ChatbotMessageContainer = ({
  messageHistory,
  messageContainerRef
}: ChatbotMessageContainerProps) => {
  return (
    <div
      className={styles.ChatMessageContainer}
      ref={messageContainerRef}
    >
      {typeof messageHistory === 'string' && Boolean(messageHistory) && (
        <div dangerouslySetInnerHTML={{ __html: messageHistory as string }} />
      )}

      {/* {renderMessages()} */}
      <div style={{ paddingBottom: '15px', backgroundColor: 'red' }} />
    </div>
  );
};

export default ChatbotMessageContainer;
