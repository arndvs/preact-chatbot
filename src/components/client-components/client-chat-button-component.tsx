import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  islandName: string;
  storeId: string | undefined;
  domain: string | undefined;
}

const ClientChatButtonComponent = ({
  islandName,
  storeId,
  domain
}: ClientChatButtonComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('ClientChatButtonComponent - storeId', storeId);

  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';
  console.log('ClientChatButtonComponent - idToUse', idToUse);

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse);
  //   TODO: Add domain check logic

  return (
    <>
      {data && (
        <ChatbotContextProvider
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          session_id={data.session_id}
          customer_store_id={data.customer_store_id}
          messages={data.messages}
          store_id={idToUse}
          placeholderText={'Ask a question...'}
          domain={domain}
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
