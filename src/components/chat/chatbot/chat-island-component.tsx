import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';

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
  session_id: string; // This is the session_id that is used to identify the user
}

const ChatIslandComponent = ({
  islandName,
  storeId
}: ChatIslandComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<InitialBotSettings | null>(null);
  const idToUse = storeId || '20';

  const getInitialData = async () => {
    try {
      const response = await axios.get(
        `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${idToUse}`
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
  console.log('data first', data);
  return (
    <>
      {data ? (
        <ChatbotContextProvider
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          session_id={data.session_id}
          store_id={idToUse}
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
