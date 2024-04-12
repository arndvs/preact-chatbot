import { XMarkIcon } from 'src/assets/x-mark-icon';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import useClassNames from 'src/hooks/useClassNames';

interface ChatbotHeaderCloseButton {
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotHeaderCloseChatButton = ({
  setIsOpen
}: ChatbotHeaderCloseButton) => {
  const { islandType } = useChatbotContext();
  return (
    <>
      <button
        type="button"
        className={useClassNames(
          'inline-flex items-center justify-center p-1 text-white hover:duration-200 hover:scale-110 hover:contrast-150',
          islandType === 'panel' ? 'hidden' : ''
        )}
        onClick={() => setIsOpen(false)}
        aria-label="Close Chat"
        title="Close Chat"
      >
        <XMarkIcon
          className="w-6 h-6"
          aria-hidden="true"
        />
      </button>
    </>
  );
};

export default ChatbotHeaderCloseChatButton;
