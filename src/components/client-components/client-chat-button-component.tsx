import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [showChatbot, setShowChatbot] = useState<boolean | null>(null);
  const idToUse = storeId || '144';
  const envToUse = env || null;
  const domainToUse = domain || 'https://www.example.com';
  const islandTypeToUse = islandType || 'button';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse, env, islandType, islandName);

  useEffect(() => {
    const fetchChatbotSettings = async () => {
      try {
        const chatApiUrl =
          envToUse === 'dev'
            ? 'https://api.rmdevs.com'
            : process.env.CHAT_API_URL;
        console.log('chatApiUrl', chatApiUrl);
        console.log('Fetching chatbot settings...');
        const response = await axios.get(
          `${chatApiUrl}/v2/external_chatbot_initial_settings/${idToUse}`,
          { withCredentials: true }
        );
        console.log('Fetched chatbot settings:', response.data);
        setShowChatbot(response.data.show_chatbot);
      } catch (error) {
        console.error('Error fetching chatbot settings:', error);
        setShowChatbot(false);
      }
    };

    fetchChatbotSettings();
  }, [idToUse, envToUse]);

  if (showChatbot === null) {
    return null; // Or a loading indicator
  }

  if (!showChatbot) {
    console.log('Chatbot is not enabled for this store.');
    return null;
  }

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
