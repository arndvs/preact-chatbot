import { useState } from 'preact/compat';
import ChatBubbleButton from 'src/components/chat-island/chat-bubble-button';
import ChatModal from 'src/components/chat-island/chat-modal';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

interface ChatIslandProps {
  islandName: string;
}

const ChatIsland = ({ islandName }: ChatIslandProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useWebComponentEvents(islandName);

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

export default ChatIsland;
