import { ChangeEvent } from 'preact/compat';
import { createChatMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { scrollIntoView } from 'src/actions/chatbot/scroll-into-view';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
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
  customStyles
}: ChatbotInputContainerProps) => {
  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }
  const { placeholderText } = useChatbotContext();

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
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between px-2 py-2 bg-white border-t">
        <div className="flex items-center justify-between w-full leading-none">
          <input
            className="w-full px-4 py-3 text-sm bg-red-500 border-none focus:outline-none focus:ring-none"
            placeholder={placeholder}
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              setInputValue(target.value);
            }}
            required
            maxLength={4000}
            rows={1}
            tabIndex={0}
            aria-label={placeholder}
            title={placeholder}
          />
        </div>
        <div className="flex items-end justify-between leading-none bg-blue-500">
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="inline-flex items-center justify-center p-1 text-sm font-medium transition-colors rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50 h-9"
            type="submit"
            aria-label="Send Message"
            title="Send Message"
          >
            <AirplaneIcon
              className={useClassNames(
                'w-6 h-6 ',
                !input ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'
              )}
            />
          </button>
        </div>
      </div>
      {/* <div className="flex items-center w-full border-t border-gray-200 ">
          <div class="flex gap-2 overflow-x-auto p-3"></div>

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
        </div> */}
    </form>
  );
};

export default ChatbotInputContainer;
