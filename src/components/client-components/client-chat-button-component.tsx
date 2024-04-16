import { useState } from 'preact/compat';
import { useCookies } from 'react-cookie';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import { userMessage } from 'src/actions/chatbot/chatbot-message-utils';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  islandName: string;
  storeId: string | undefined;
  domain: string | undefined;
  islandType: string | undefined;
  env: string | undefined;
}

const ClientChatButtonComponent = ({
  islandName,
  storeId,
  domain,
  islandType,
  env
}: ClientChatButtonComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use the storeId if it is passed in, otherwise use the default storeId
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType);

  console.log(`${islandName} - chat button env`, env);
  console.log(`${islandName} - chat button islandType`, islandType);

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
