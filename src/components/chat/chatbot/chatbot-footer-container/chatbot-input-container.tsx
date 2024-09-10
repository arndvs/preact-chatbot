import { ChangeEvent, useState, useEffect } from 'preact/compat';
import { createChatMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { scrollIntoView } from 'src/actions/chatbot/scroll-into-view';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import useClassNames from 'src/hooks/useClassNames';
import { ChatbotInputContainerProps } from 'src/types/IChatbotWidget';

const ChatbotInputContainer = ({
  validator,
  input,
  setInputValue,
  parse,
  messageParser,
  messageContainerRef,
  customStyles
}: ChatbotInputContainerProps) => {
  const { setMessages } = useChatbotContext();

  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }
  const { placeholderText } = useChatbotContext();

  let placeholder = 'Write your message...';
  if (placeholderText) {
    placeholder = placeholderText;
  }

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(
    Date.now()
  );
  const [messageCount, setMessageCount] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const rateLimitWindow = 60000;
  const maxMessagesPerWindow = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastMessageTimestamp > rateLimitWindow) {
        setMessageCount(0);
        setIsRateLimited(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastMessageTimestamp]);

  const sanitizeInput = (input: string) => {
    const sanitized = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return sanitized;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (isRateLimited) {
      alert(
        'You are sending messages too quickly. Please wait a moment and try again.'
      );
      return;
    }

    const sanitizedInput = sanitizeInput(input);

    const currentTimestamp = Date.now();
    if (currentTimestamp - lastMessageTimestamp <= rateLimitWindow) {
      if (messageCount >= maxMessagesPerWindow) {
        setIsRateLimited(true);
        alert('Rate limit exceeded. Please wait before sending more messages.');
        return;
      }
      setMessageCount((prevCount) => prevCount + 1);
    } else {
      setMessageCount(1);
      setLastMessageTimestamp(currentTimestamp);
    }

    if (validator && typeof validator === 'function') {
      if (validator(sanitizedInput)) {
        handleValidMessage(sanitizedInput);
        if (parse) {
          return parse(sanitizedInput);
        }
        messageParser.parse(sanitizedInput);
      }
    } else {
      handleValidMessage(sanitizedInput);
      if (parse) {
        return parse(sanitizedInput);
      }
      messageParser.parse(sanitizedInput);
    }
  };

  const handleValidMessage = (sanitizedInput: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      createChatMessage(sanitizedInput, 'user')
    ]);

    scrollIntoView(messageContainerRef);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between px-2 py-2 bg-white border-t">
        <div className="flex items-center justify-between w-full leading-none">
          <input
            className="w-full px-2 text-sm border-none focus:outline-none focus:ring-none"
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
        <div
          className="flex leading-none "
          aria-label="Send Message"
          title="Send Message"
        >
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isRateLimited}
            className="inline-flex items-center justify-end p-1 text-sm font-medium transition-colors rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50 h-9"
            type="submit"
          >
            <AirplaneIcon
              className={useClassNames(
                'w-6 h-6 ',
                !input || isRateLimited
                  ? 'text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
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
