import { useState } from 'preact/compat';
import ChatBubbleButton from 'src/components/chat/chat-bubble-button';
import ChatModal from 'src/components/chat/chat-modal';

interface ChatIslandComponentProps {
  islandName: string;
}

const ChatIslandComponent = ({ islandName }: ChatIslandComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatBubbleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ChatModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        islandName={islandName}
      />
    </>
  );
};

export default ChatIslandComponent;
