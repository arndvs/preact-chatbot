import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ActionProvider from 'src/actions/chatbot/action-provider';
import MessageParser from 'src/actions/chatbot/message-parser';
import Chatbot from 'src/components/chat/chatbot/chatbot';
import { Box } from 'src/components/ui';
import { useChatbotConfig } from 'src/hooks/useChatbotConfig';
import { useInitialData } from 'src/hooks/useInitialData';

interface ChatPanelComponentProps {
  storeId: string | undefined;
  env: string | undefined;
  islandType?: string | undefined;
  islandName: string;
  domain: string | undefined;
}

const ClientChatPanelComponent = ({
  islandName,
  storeId,
  domain,
  islandType,
  env
}: ChatPanelComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '117';
  const envToUse = env || '';
  const domainToUse = domain || 'https://www.example.com';
  const islandTypeToUse = islandType || 'panel';

  console.log(
    'chatbot params',
    idToUse,
    envToUse,
    islandTypeToUse,
    islandName,
    domainToUse
  );

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType, islandName);

  // Initialize ChatbotConfig
  const chatbotConfig = useChatbotConfig();

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
          domain={domainToUse}
          placeholderText={data.chatbotSettings.placeholderText}
          chatHeadingColor={data.chatbotSettings.chatHeadingColor}
          suggestedMessages={data.chatbotSettings.suggestedMessages}
          profilePicture={data.chatbotSettings.profilePicture}
          displayName={data.chatbotSettings.displayName}
          userMessageColor={data.chatbotSettings.userMessageColor}
          chatIcon={data.chatbotSettings.chatIcon}
          chatBubbleButtonColor={data.chatbotSettings.chatBubbleButtonColor}
          islandType={islandTypeToUse}
          env={envToUse}
          islandName={islandName}
          isOpen={false}
          setIsOpen={() => {}}
        >
          <Box
            data-testId="overlay-content"
            className="z-[888889] border-none flex flex-col w-[28rem] justify-between shadow-custom bottom-20 right-4 h-75vh max-h-75vh rounded-lg overflow-hidden bg-white"
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
