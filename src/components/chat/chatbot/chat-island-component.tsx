import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import MySwiperComponent from 'src/components/chat/chatbot-widgets/handle-products/swiper';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';

interface ChatIslandComponentProps {
  islandName: string;
}

const ChatIslandComponent = ({ islandName }: ChatIslandComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const brandColor = '#FF792A';
  const storeName = 'RipeMetrics';
  const storeLogo =
    'https://ripemetrics.com/favicon/apple-touch-icon-57x57.png';
  const placeholderText = 'Ask a question...';

  //TODO - get state

  return (
    <>
      <ChatbotContextProvider
        storeName={storeName}
        storeLogo={storeLogo}
        brandColor={brandColor}
        placeholderText={placeholderText}
      >
        <ChatbotContextComponent />

        <ChatBubbleButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <ChatModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          islandName={islandName}
        />
      </ChatbotContextProvider>
    </>
  );
};

export default ChatIslandComponent;
