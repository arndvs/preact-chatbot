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
  if (!storeId) throw new Error('storeId prop is required');
  const idToUse = storeId;

  const domain = 'https://www.example.com';

  // Fetch the initial store data for the chatbot

  const data = useInitialData(idToUse, env, islandType, islandName);

  return (
    <>
      {data && (
        <ChatbotContextProvider
          domain={domain}
          islandType={islandType}
          env={env}
          islandName={islandName}
          session_id={data.session_id}
          customer_store_id={data.customer_store_id}
          messages={data.messages}
          isOpen={false}
          setIsOpen={() => {}}
          store_id={idToUse}
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          profilePicture={data.profile_picture_url}
          chatHeadingColor={data.header_background_color}
          chatHeadingFontColor={data.header_text_color}
          displayName={data.chatbot_name}
          botGreeting={data.bot_greeting}
          userMessageBackgroundColor={data.user_text_color}
          userMessageFontColor={data.user_font_color}
          placeholderText={data.bot_placeholder}
          chatBubbleButtonColor={data.button_color}
          chatBubbleButtonIconColor={data.button_icon_color}
          chatIcon={data.chat_icon_url}
        >
          <ChatbotContextComponent />
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ChatbotContextDataComponent;
