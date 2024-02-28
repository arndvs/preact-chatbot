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
      className={`inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1 shadow-sm hover:transition-all focus:duration-150 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none active:bg-gray-200 active:text-white`}
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
