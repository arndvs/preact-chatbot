import ActionProvider from 'src/actions/chatbot/action-provider';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  storeId: string | undefined;
  env: string | null;
  islandType?: string | undefined;
  islandName: string;
  domain: string | undefined;
}

const ClientChatButtonComponent = ({
  islandName,
  storeId,
  domain,
  islandType,
  env
}: ClientChatButtonComponentProps) => {
  const idToUse = storeId || '143';
  const envToUse = env || null;
  const domainToUse = domain || 'https://www.example.com';
  const islandTypeToUse = islandType || 'button';

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

  return (
    <>
      {data && (
        <ChatbotContextProvider
          session_id={data.session_id}
          customer_store_id={data.customer_store_id}
          messages={data.messages}
          islandType={islandTypeToUse}
          env={envToUse}
          islandName={islandName}
          isOpen={false}
          setIsOpen={() => {}}
          store_id={idToUse}
          domain={domainToUse}
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          profilePicture={data.profile_picture_url}
          chatHeadingColor={data.header_background_color}
          chatHeadingFontColor={data.header_text_color}
          displayName={data.chatbot_name}
          botGreeting={data.bot_greeting}
          userMessageColor={data.user_text_color}
          userMessageTextColor={data.user_text_color}
          placeholderText={data.bot_placeholder}
          chatBubbleButtonColor={data.button_color}
          chatBubbleButtonIconColor={data.button_icon_color}
          chatIcon={data.chat_icon_url}
        >
          <ActionProvider>
            <ChatBubbleButton />
            <ChatModal islandName={islandName} />
          </ActionProvider>
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientChatButtonComponent;
