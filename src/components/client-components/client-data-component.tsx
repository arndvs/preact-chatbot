import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';

import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientDataComponentProps {
  storeId: string | undefined;
}

const ClientDataComponent = ({ storeId }: ClientDataComponentProps) => {
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
          customer_store_id={data.customer_store_id}
          store_id={idToUse}
          placeholderText={'Ask a question...'}
        >
          <ChatbotContextComponent />
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientDataComponent;
