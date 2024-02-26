import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';

interface ChatBubbleButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatBubbleButton = ({ isOpen, setIsOpen }: ChatBubbleButtonProps) => {
  return (
    <button
      className="fixed z-50 w-12 h-12 text-black transition-all duration-200 bg-white rounded-full shadow-md cursor-pointer bottom-4 right-4"
      onClick={() => setIsOpen(!isOpen)}
      data-testid="chat-bubble-button"
    >
      <div className="flex items-center justify-center w-full h-full">
        {!isOpen ? (
          <ChatIcon
            className="w-12 h-12 rounded-full"
            aria-hidden="true"
          />
        ) : (
          <XMarkIcon
            className="w-12 h-12 rounded-full"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
};

export default ChatBubbleButton;
