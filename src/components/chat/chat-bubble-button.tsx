import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import * as styles from 'src/styles/chat-bubble.css';

interface ChatBubbleButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  brandColor?: string;
}

const ChatBubbleButton = ({
  isOpen,
  setIsOpen,
  brandColor
}: ChatBubbleButtonProps) => {
  return (
    <>
      <div className="cursor-pointer">
        <button
          className="inline-flex items-center justify-center fixed z-[888888] text-white rounded-full shadow-sm h-12 w-12 cursor-pointer hover:duration-200 hover:scale-105 bottom-4 right-4 hover:shadow-md hover:contrast-150"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: brandColor ?? '#e5e5e5'
          }}
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
    </>
  );
};

export default ChatBubbleButton;
