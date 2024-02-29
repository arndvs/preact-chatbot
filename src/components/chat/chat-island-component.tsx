import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot-context-provider';
import ChatBubbleButton from 'src/components/chat/chat-bubble-button';
import ChatModal from 'src/components/chat/chat-modal';
import ChatbotContextComponent from 'src/components/chat/testing-context-component';

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
      <ChatbotContextProvider
        storeName={storeName}
        storeLogo={storeLogo}
        brandColor={brandColor}
      >
        <ChatbotContextComponent />
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
      </ChatbotContextProvider>
    </>
  );
};

export default ChatIslandComponent;
