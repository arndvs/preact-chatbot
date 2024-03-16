import { XMarkIcon } from 'src/assets/x-mark-icon';

interface ChatbotHeaderCloseButton {
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotHeaderCloseChatButton = ({
  setIsOpen
}: ChatbotHeaderCloseButton) => {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center p-1 text-white hover:duration-200 hover:scale-110 hover:contrast-150"
        onClick={() => setIsOpen(false)}
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
