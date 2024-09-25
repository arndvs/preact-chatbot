import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { getChatApiUrl } from 'src/config/chat-api-url';
import formattedCookieName from 'src/utils/formatted-cookie-name';

export interface InitialBotSettings {
  show_chatbot: boolean | null;
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
}

export const useInitialData = (
  storeId: string,
  env: string | null,
  islandType: string | undefined,
  islandName: string
) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);

  const formattedIslandName = islandName.replace(/-/g, '_');
  const cookieName = formattedCookieName(formattedIslandName);
  const [cookies, setCookie] = useCookies([
    `ripemetrics_chatbot-${islandType}`
  ]);

  const chatApiUrl = getChatApiUrl(env);
  const aiEndpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${storeId}`;

  const getInitialData = async () => {
    try {
      // storeId [0] - session_id [1] - customer_store_id [2]
      const cookie = cookies[`ripemetrics_chatbot-${islandType}`]?.split('-');
      //convert island name to use underscores instead of dashes
      const formattedIslandName = islandName.replace(/-/g, '_');

      const response = await axios.post(aiEndpoint, {
        session_id: cookie?.length ? cookie[1] : null,
        customer_store_id: cookie?.length ? cookie[2] : null,
        refresh: false,
        island_name: formattedIslandName
      });

      if (response.data.show_chatbot !== false) {
        console.log(
          'response.data.show_chatbot !== false response.data',
          response.data
        );
      }

      if (!cookie?.length || cookie[1] !== response.data.session_id) {
        // if (islandType !== 'panel') {
        const domain = window.location.hostname;

        setCookie(
          `ripemetrics_chatbot-${islandType}`,
          `${storeId}-${response.data.session_id}-${response.data.customer_store_id}`,
          {
            path: '/',
            domain: domain
          }
        );
        // }
      }

      return response.data as InitialBotSettings;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMessageHistory = async () => {
    try {
      const cookie = cookies[`ripemetrics_chatbot-${islandType}`]?.split('-');

      if (!cookie?.length) return null;
      const history_endpoint = `${chatApiUrl}/api/v2/external_chatbot/message_history/${cookie[2]}/${cookie[1]}`;
      const response = await axios.get(history_endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (data && data.show_chatbot !== false) {
      getInitialData().then((data) => {
        if (data) {
          getMessageHistory().then((history) => {
            const initialMessage = createChatBotMessage(
              `${data.bot_greeting}`,
              {
                loading: false
              }
            );

            setData({
              ...data,
              messages: [initialMessage, ...(history || [])]
            });
          });
        } else {
          setData(null);
        }
      });
    } else {
      setData(null);
    }
  }, []);

  return data;
};
