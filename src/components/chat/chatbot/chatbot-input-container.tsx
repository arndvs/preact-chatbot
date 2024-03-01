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
    <>
      <div className="flex items-center w-full border-t border-gray-200 ">
        <form
          className="flex w-full bg-white"
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
      {/* <form className="px-4 py-3 shrink-0">
        <div className="relative">
          <label
            for="message"
            className="sr-only"
          >
            {placeholder}
          </label>
          <textarea
            id="message"
            name="message"
            placeholder={placeholder}
            className="min-h-8 block w-full resize-y appearance-none bg-white text-[length:--chat-fontSize] text-gray-900 caret-[--chat-color] rounded-xl border-gray-300 py-2.5 pl-3 pr-24 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[--chat-color] focus:border-[--chat-color]"
            aria-label={placeholder}
            autocomplete="off"
            value={input}
          />
          <div className="absolute flex items-center bottom-0.5 right-0.5">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 p-2 text-sm font-semibold text-blue-600 transition-all duration-150 border border-transparent rounded-md shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              disabled={!input.trim()}
              onClick={handleSubmit}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
              </svg>
            </button>
          </div>
        </div>
      </form> */}
    </>
  );
};

export default ChatbotInputContainer;
