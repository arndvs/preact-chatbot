import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ChatbotContextComponent from 'src/components/chat/chatbot/chatbot-context-component';
import { useInitialData } from 'src/hooks/useInitialData';

interface ChatbotContextDataComponentProps {
  storeId: string | undefined;
  env: string | undefined;
  islandType: string | undefined;
}

const ChatbotContextDataComponent = ({
  storeId,
  env,
  islandType
}: ChatbotContextDataComponentProps) => {
  // use the If storeId is undefined, use the default storeId of 20
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType);

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
          placeholderText={data.chatbotSettings.placeholderText}
          chatHeadingColor={data.chatbotSettings.chatHeadingColor}
          suggestedMessages={data.chatbotSettings.suggestedMessages}
          profilePicture={data.chatbotSettings.profilePicture}
          displayName={data.chatbotSettings.displayName}
          userMessageColor={data.chatbotSettings.userMessageColor}
          chatIcon={data.chatbotSettings.chatIcon}
          chatBubbleButtonColor={data.chatbotSettings.chatBubbleButtonColor}
          env={env}
          islandType={islandType}
        >
          <ChatbotContextComponent />
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ChatbotContextDataComponent;
