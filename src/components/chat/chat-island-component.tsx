import { useState } from 'preact/compat';
import ChatBubbleButton from 'src/components/chat/chat-bubble-button';
import ChatModal from 'src/components/chat/chat-modal';

interface ChatIslandComponentProps {
  islandName: string;
}

const ChatIslandComponent = ({ islandName }: ChatIslandComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const brandColor = '#FF792A';
  const storeName = 'RipeMetrics';
  const storeLogo =
    'https://ripemetrics.com/favicon/apple-touch-icon-57x57.png';

  return (
    <>
      <ChatBubbleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        brandColor={brandColor}
      />
      <ChatModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        islandName={islandName}
        brandColor={brandColor}
        storeName={storeName}
        storeLogo={storeLogo}
      />
    </>
  );
};

export default ChatIslandComponent;
