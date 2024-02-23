import { ChangeEvent } from 'preact/compat';
import { scrollIntoView } from 'src/actions/scroll-into-view';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import * as styles from 'src/styles/chat-widget.css';
import { ChatbotInputContainerProps } from 'src/types/IChatbotWidget';
import { createChatMessage } from 'src/actions/chatbot-message-utils';

const ChatbotInputContainer = ({
  setState,
  validator,
  input,
  setInputValue,
  parse,
  messageParser,
  messageContainerRef,
  placeholderText,
  customStyles
}: ChatbotInputContainerProps) => {
  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let placeholder = 'Ask a  question...';
  if (placeholderText) {
    placeholder = placeholderText;
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validator && typeof validator === 'function') {
      if (validator(input)) {
        handleValidMessage();
        if (parse) {
          return parse(input);
        }
        messageParser.parse(input);
      }
    } else {
      handleValidMessage();
      if (parse) {
        return parse(input);
      }
      messageParser.parse(input);
    }
  };

  const handleValidMessage = () => {
    if (setState) {
      setState((state: any) => ({
        ...state,
        messages: [...state.messages, createChatMessage(input, 'user')]
      }));

      scrollIntoView(messageContainerRef);
      setInputValue('');
    }
  };

  return (
    <div className={styles.ChatInputContainer}>
      <form
        className={styles.ChatInputForm}
        onSubmit={handleSubmit}
      >
        <input
          className={styles.ChatInput}
          placeholder={placeholder}
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            setInputValue(target.value);
          }}
        />
        <button
          className={styles.ChatBtnSend}
          style={customButtonStyle}
        >
          <AirplaneIcon className={styles.ChatBtnSendIcon} />
        </button>
      </form>
    </div>
  );
};

export default ChatbotInputContainer;
