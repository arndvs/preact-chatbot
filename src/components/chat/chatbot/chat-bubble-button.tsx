import ActionProvider from 'src/actions/chatbot/action-provider';
import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { createChatBotMessage } from '../../../actions/chatbot/chatbot-message-utils';

interface ChatBubbleButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatBubbleButton = ({ isOpen, setIsOpen }: ChatBubbleButtonProps) => {
  const { chatBubbleButtonColor, brandColor } = useChatbotContext();

  // Determine the background color based on conditions
  const backgroundColor =
    chatBubbleButtonColor != null && chatBubbleButtonColor !== ''
      ? chatBubbleButtonColor
      : brandColor ?? '#e5e5e5';

  return (
    <div className="cursor-pointer">
      <button
        className="bottom-4 right-4 fixed inline-flex items-center justify-center z-[988888] text-white rounded-full shadow-custom h-12 w-12 cursor-pointer hover:duration-200 hover:scale-105  hover:shadow-md hover:contrast-150"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: backgroundColor
        }}
        aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        title={isOpen ? 'Close Chat' : 'Open Chat'}
      >
        <div className="flex items-center justify-center w-full h-full">
          {!isOpen ? (
            <ChatIcon
              className="w-6 h-6"
              aria-hidden="true"
            />
          ) : (
            <XMarkIcon
              className="w-7 h-7"
              aria-hidden="true"
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatBubbleButton;
