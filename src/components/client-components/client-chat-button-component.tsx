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
  const idToUse = storeId || '144';
  const envToUse = env || null;
  const domainToUse = domain || 'https://www.example.com';
  const islandTypeToUse = islandType || 'button';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType, islandName);

  if (data && data?.show_chatbot !== false) {
    return (
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
        <ActionProvider>
          <div
            className="ripe-metrics-chat-root"
            style={
              {
                all: 'initial',
                display: 'block',
                contain: 'content',
                isolation: 'isolate',
                fontSize: '16px !important',
                fontFamily:
                  '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: '1.5',
                boxSizing: 'border-box',
                // Remove CSS custom properties that might interfere
                '--font-body-scale': 'none',
                '--base-font-size': 'none',
                '--text-base-size': 'none',
                '--font-size-root': 'none',
                '--font-size-base': 'none',
                fontSizeAdjust: 'none',
                textSizeAdjust: 'none',
                WebkitTextSizeAdjust: 'none',
                MozTextSizeAdjust: 'none',
                msTextSizeAdjust: 'none'
              } as any
            }
          >
            <ChatBubbleButton />
            <ChatModal islandName={islandName} />
          </div>
        </ActionProvider>
      </ChatbotContextProvider>
    );
  } else {
    console.log('Chatbot is not enabled');
    return null;
  }
};

export default ClientChatButtonComponent;
