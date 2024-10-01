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
  env: string | null;
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
  const idToUse = storeId || '148';
  const envToUse = env || null;
  const domainToUse = domain || 'https://www.example.com';
  const islandTypeToUse = islandType || 'panel';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType, islandName);

  // Initialize ChatbotConfig
  const chatbotConfig = useChatbotConfig();

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
          userMessageBackgroundColor={data.user_text_color}
          userMessageFontColor={data.user_font_color}
          placeholderText={data.bot_placeholder}
          chatBubbleButtonColor={data.button_color}
          chatBubbleButtonIconColor={data.button_icon_color}
          chatIcon={data.chat_icon_url}
        >
          <Box
            data-testId="overlay-content"
            className="z-[8888888889]  border-none flex flex-col w-[28rem] justify-between shadow-custom bottom-20 right-4 h-75vh max-h-75vh rounded-lg overflow-hidden bg-white"
          >
            <ActionProvider>
              <Chatbot
                config={chatbotConfig}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </ActionProvider>
          </Box>
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientChatPanelComponent;
