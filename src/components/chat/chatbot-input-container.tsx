import { ChangeEvent } from 'preact/compat';
import { createChatMessage } from 'src/actions/chatbot-message-utils';
import { scrollIntoView } from 'src/actions/scroll-into-view';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import useClassNames from 'src/hooks/useClassNames';
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
  customStyles,
  brandColor
}: ChatbotInputContainerProps) => {
  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let placeholder = 'Write your message...';
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
    <div className="flex items-center w-full -mb-4 ">
      <form
        className="flex w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-3 text-sm border-none rounded-bl-lg focus:outline-none focus:ring-none "
          placeholder={placeholder}
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            setInputValue(target.value);
          }}
        />
        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full text-gray-600 hover:text-gray-800`}
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          <AirplaneIcon
            className={useClassNames(
              'w-6 h-6 ',
              !input ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'
            )}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatbotInputContainer;
