import * as styles from 'src/styles/chat-widget.css';
import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({
  customComponents,
  actionProvider,
  botName,
  headerText
}: ChatbotHeaderContainerProps) => {
  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  return (
    <>
      {customComponents.header && customComponents.header(actionProvider) ? (
        customComponents.header && customComponents.header(actionProvider)
      ) : (
        <div className={styles.ChatHeader}>{header}</div>
      )}
    </>
  );
};

export default ChatbotHeaderContainer;
