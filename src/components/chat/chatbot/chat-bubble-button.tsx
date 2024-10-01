import ActionProvider from 'src/actions/chatbot/action-provider';
import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { createChatBotMessage } from '../../../actions/chatbot/chatbot-message-utils';

const ChatBubbleButton = () => {
  const {
    chatBubbleButtonColor,
    chatBubbleButtonIconColor,
    brandColor,
    setIsOpen,
    isOpen
  } = useChatbotContext();

  // Determine the background color based on conditions
  const backgroundColor =
    chatBubbleButtonColor != null && chatBubbleButtonColor !== ''
      ? chatBubbleButtonColor
      : brandColor ?? '#e5e5e5';

  return (
    <div className="cursor-pointer">
      <button
        className="bottom-4 right-4 fixed inline-flex items-center justify-center z-[8888888888]  text-white rounded-full shadow-custom h-12 w-12 cursor-pointer hover:duration-200 hover:scale-105  hover:shadow-md hover:contrast-150"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: backgroundColor
        }}
        aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        title={isOpen ? 'Close Chat' : 'Open Chat'}
      >
        <div className="flex items-center justify-center w-full h-full">
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill={chatBubbleButtonIconColor}
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={chatBubbleButtonIconColor}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatBubbleButton;
