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
      className="inline-flex items-center justify-center p-1 text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 active:bg-gray-100 focus:outline-none active:text-gray-900 focus:ring-none"
      onClick={() => setIsOpen(false)}
    >
      <XMarkIcon
        className="w-5 h-5"
        aria-hidden="true"
      />
    </button>
  </div>
);

export default ChatbotHeaderCloseChatButton;
