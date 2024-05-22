import ActionProvider from 'src/actions/chatbot/action-provider';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import MessageParser from 'src/actions/chatbot/message-parser';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  storeId: string | undefined;
  env: string | undefined;
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
  console.log('env', env);
  const idToUse = storeId || '20';
  const envToUse = env || 'dev';
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
          env={env}
          islandName={islandName}
          isOpen={false}
          setIsOpen={() => {}}
        >
          <MessageParser actions={{ handleDefault: () => {} }}>
            <ChatBubbleButton />
            <ActionProvider createChatBotMessage={createChatBotMessage}>
              <ChatModal islandName={islandName} />
            </ActionProvider>
          </MessageParser>
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientChatButtonComponent;
