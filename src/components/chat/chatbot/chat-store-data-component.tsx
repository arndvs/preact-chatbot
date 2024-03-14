import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';

import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';
import { useInitialData } from 'src/hooks/useInitialData';

interface ChatStoreDataComponentProps {
  storeId: string | undefined;
}

const ChatStoreDataComponent = ({ storeId }: ChatStoreDataComponentProps) => {
  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse);

  console.log('Panel data', data);
  return (
    <>
      STORE DATA
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
        </ChatbotContextProvider>
      ) : (
        <div>Waiting on data</div>
      )}
    </>
  );
};

export default ChatStoreDataComponent;
