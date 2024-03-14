import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';

import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  islandName: string;
  storeId: string | undefined;
}

const ClientChatButtonComponent = ({
  islandName,
  storeId
}: ClientChatButtonComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse);

  console.log('Panel data', data);
  return (
    <>
      {data && (
        <ChatbotContextProvider
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          session_id={data.session_id}
          store_id={idToUse}
          placeholderText={'Ask a question...'}
        >
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
      )}
    </>
  );
};

export default ClientChatButtonComponent;
