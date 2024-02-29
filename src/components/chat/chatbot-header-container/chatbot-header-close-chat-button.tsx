import { XMarkIcon } from 'src/assets/x-mark-icon';

interface ChatbotHeaderCloseButton {
  brandColor: string;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotHeaderCloseChatButton = ({
  brandColor,
  setIsOpen
}: ChatbotHeaderCloseButton) => (
  <div>
    <button
      type="button"
      className="inline-flex items-center justify-center p-1 text-white hover:duration-200 hover:scale-110 hover:contrast-150"
      //   className="inline-flex items-center justify-center p-1 text-white hover:duration-200 hover:scale-110 hover:text-gray-50 focus:outline-none active:outline-none active:text-gray-100 focus:ring-none active:ring-none"
      onClick={() => setIsOpen(false)}
    >
      <XMarkIcon
        className="w-6 h-6"
        aria-hidden="true"
      />
    </button>
  </div>
);

export default ChatbotHeaderCloseChatButton;
