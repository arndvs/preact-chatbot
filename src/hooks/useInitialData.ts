import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { getChatApiUrl } from 'src/config/chat-api-url';
import { useSession } from './useSession';

export interface InitialBotSettings {
  store_name: string;
  store_logo: string;
  brand_color: string;
  session_id: string;
  customer_store_id: string;
  store_id: string;
  messages: any[];
  initial_message: string;
  chatbotSettings: {
    chatHeadingColor: string;
    initialMessages: string[];
    placeholderText: string;
    profilePicture: string;
    displayName: string;
    userMessageBackgroundColor: string;
    chatIcon: string;
    chatBubbleButtonColor: string;
  };
  header_background_color: string;
  header_text_color: string;
  chat_button_background_color: string;
  button_icon_color: string;
  chat_button_font_color: string;
  profile_picture_url: string;
  chat_icon_url: string;
  bot_greeting: string;
  bot_placeholder: string;
  user_text_color: string;
  user_font_color: string;
  chatbot_name: string;
  button_color: string;
  button_font_color: string;
  show_chatbot?: boolean | null;
}

export const useInitialData = (
  storeId: string,
  env: string | null,
  islandType: string | undefined,
  islandName: string
) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);

  const { session, setSession } = useSession(islandType || 'default');

  const chatApiUrl = getChatApiUrl(env);
  const aiEndpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${storeId}`;

  const chatbotSettings = {
    chatHeadingColor: '',
    initialMessages: ['Hi there! How can I help you today?'],

    placeholderText: 'Ask a question...',
    profilePicture: '',
    displayName: '',
    userMessageBackgroundColor: '',
    chatIcon: 'https://via.placeholder.com/150',
    chatBubbleButtonColor: ''
  };

  const getInitialData = async () => {
    try {
      const formattedIslandName = islandName.replace(/-/g, '_');

      const response = await axios.post(aiEndpoint, {
        session_id: session.sessionId ?? null,
        customer_store_id: session.customerStoreId ?? null,
        refresh: false,
        island_name: formattedIslandName
      });

      if (!session.sessionId || session.sessionId !== response.data.session_id) {
        setSession(
          storeId,
          response.data.session_id,
          response.data.customer_store_id
        );
      }

      return response.data as InitialBotSettings;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMessageHistory = async () => {
    try {
      if (!session.customerStoreId || !session.sessionId) return null;
      const history_endpoint = `${chatApiUrl}/api/v2/external_chatbot/message_history/${session.customerStoreId}/${session.sessionId}`;
      const response = await axios.get(history_endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getInitialData().then((data) => {
      if (data) {
        getMessageHistory().then((history) => {
          const initialMessage = createChatBotMessage(`${data.bot_greeting}`, {
            loading: false
          });

          setData({
            ...data,
            messages: [initialMessage, ...(history || [])],
            chatbotSettings
          });
        });
      } else {
        setData(null);
      }
    });
  }, []);

  return data;
};
