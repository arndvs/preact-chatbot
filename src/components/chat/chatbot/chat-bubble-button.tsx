import { ChatIcon } from 'src/assets/chat-icon';
import { XMarkIcon } from 'src/assets/x-mark-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatBubbleButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatBubbleButton = ({ isOpen, setIsOpen }: ChatBubbleButtonProps) => {
  const { brandColor } = useChatbotContext();
  return (
    <>
      <div className="cursor-pointer">
        <button
          className="inline-flex items-center justify-center fixed z-[888888] text-white rounded-full shadow-custom h-12 w-12 cursor-pointer hover:duration-200 hover:scale-105 bottom-4 right-4 hover:shadow-md hover:contrast-150"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: brandColor ?? '#e5e5e5'
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
    </>
  );
};

export default ChatBubbleButton;
