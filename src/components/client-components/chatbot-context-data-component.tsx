import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';
import { useInitialData } from 'src/hooks/useInitialData';

interface ChatbotContextDataComponentProps {
  storeId: string | undefined;
  env: string | null;
  islandType?: string | undefined;
  islandName: string;
}

const ChatbotContextDataComponent = ({
  storeId,
  env,
  islandType,
  islandName
}: ChatbotContextDataComponentProps) => {
  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';

  const domain = 'https://www.example.com';

  // Fetch the initial store data for the chatbot

  const data = useInitialData(idToUse, env, islandType, islandName);

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
          domain={domain}
          placeholderText={data.chatbotSettings.placeholderText}
          chatHeadingColor={data.chatbotSettings.chatHeadingColor}
          suggestedMessages={data.chatbotSettings.suggestedMessages}
          profilePicture={data.chatbotSettings.profilePicture}
          displayName={data.chatbotSettings.displayName}
          userMessageColor={data.chatbotSettings.userMessageColor}
          chatIcon={data.chatbotSettings.chatIcon}
          chatBubbleButtonColor={data.chatbotSettings.chatBubbleButtonColor}
          islandType={islandType}
          env={env}
          islandName={islandName}
          isOpen={false}
          setIsOpen={() => {}}
        >
          <ChatbotContextComponent />
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ChatbotContextDataComponent;
