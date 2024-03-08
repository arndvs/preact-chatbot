import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import MySwiperComponent from 'src/components/chat/chatbot-widgets/handle-products/swiper';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';
import { useEffect } from 'preact/hooks';
import axios from 'axios';

interface ChatIslandComponentProps {
  islandName: string;
  storeId: string | undefined;
}

interface InitialBotSettings {
  store_name: string;
  store_logo: string;
  brand_color: string;
}

const ChatIslandComponent = ({
  islandName,
  storeId
}: ChatIslandComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<InitialBotSettings | null>(null);

  const getInitialData = async () => {
    try {
      const response = await axios.get(
        `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${storeId}`
      );
      return response.data as InitialBotSettings;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getInitialData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      test
      {data ? (
        <ChatbotContextProvider
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          placeholderText={'Ask a question...'}
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
      ) : (
        <div>Waiting on data</div>
      )}
    </>
  );
};

export default ChatIslandComponent;
