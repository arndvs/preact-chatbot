import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ActionProvider from 'src/actions/chatbot/action-provider';
import MessageParser from 'src/actions/chatbot/message-parser';
import Chatbot from 'src/components/chat/chatbot/chatbot';
import { Box } from 'src/components/ui';
import { useChatbotConfig } from 'src/hooks/useChatbotConfig';
import { useInitialData } from 'src/hooks/useInitialData';

interface ChatPanelComponentProps {
  islandName: string;
  storeId: string | undefined;
  domain: string | undefined;
}

const ClientChatPanelComponent = ({
  islandName,
  storeId,
  domain
}: ChatPanelComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse);

  // Initialize Chatbot, ChatbotConfig, MessageParser, ActionProvider
  const chatbotConfig = useChatbotConfig();

  //TODO: Add domain check logic
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
          domain={domain}
          messages={data.messages}
        >
          <Box
            data-testId="overlay-content"
            className="z-[888889] border-none flex flex-col w-[28rem] justify-between shadow-custom bottom-20 right-4 h-85vh max-h-824 rounded-lg overflow-hidden bg-white"
          >
            <Chatbot
              config={chatbotConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </Box>
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientChatPanelComponent;
