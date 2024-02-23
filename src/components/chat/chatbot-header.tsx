import * as styles from 'src/styles/chat-widget.css';
import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';

interface ChatbotHeaderProps {
  customComponents: IChatbotCustomComponents;
  actionProvider: any;
  headerText?: string;
  botName: string;
}

const ChatbotHeader = ({
  customComponents,
  actionProvider,
  botName,
  headerText
}: ChatbotHeaderProps) => {
  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  return (
    <div>
      {customComponents.header && customComponents.header(actionProvider) ? (
        customComponents.header && customComponents.header(actionProvider)
      ) : (
        <div className={styles.ChatHeader}>{header}</div>
      )}
    </div>
  );
};

export default ChatbotHeader;
