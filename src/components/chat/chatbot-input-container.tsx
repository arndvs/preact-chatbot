import { ChangeEvent } from 'preact/compat';
import { createChatMessage } from 'src/actions/chatbot-message-utils';
import { scrollIntoView } from 'src/actions/scroll-into-view';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import { ChatbotInputContainerProps } from 'src/types/IChatbotWidget';

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
    <div className="absolute bottom-0 flex w-full">
      <form
        className="flex w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-bl-lg"
          placeholder={placeholder}
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            setInputValue(target.value);
          }}
        />
      </form>
      <button
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white ${customButtonStyle}`}
        onClick={handleSubmit}
      >
        <AirplaneIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatbotInputContainer;
