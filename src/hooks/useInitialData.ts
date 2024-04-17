import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { getChatApiUrl } from 'src/config/chat-api-url';
import formattedCookieName from 'src/utils/formatted-cookie-name';

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
    suggestedMessages: string[];
    placeholderText: string;
    profilePicture: string;
    displayName: string;
    userMessageColor: string;
    chatIcon: string;
    chatBubbleButtonColor: string;
  };
}

export const useInitialData = (
  storeId: string,
  env: string | undefined,
  islandType: string | undefined,
  islandName: string
) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);
  const formattedIslandName = islandName.replace(/-/g, '_');

  // const cookieName = formattedIslandName
  // ? `ripemetrics_chatbot_${formattedIslandName}`
  // : 'ripemetrics_chatbot';

  const cookieName = formattedCookieName(formattedIslandName);
  const [cookies, setCookie] = useCookies([cookieName]);

  const chatApiUrl = getChatApiUrl(env);
  console.log(`${islandName} Chat API URL:`, chatApiUrl, 'env', env);

  const aiEndpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${storeId}`;
  console.log(`${islandName} AI Endpoint:`, aiEndpoint);

  const chatbotSettings = {
    chatHeadingColor: '',
    initialMessages: ['Hi there! How can I help you today?'],
    suggestedMessages: [
      'What are your store hours?',
      'Do you offer free shipping?',
      'What is your return policy?'
    ],
    placeholderText: 'Ask a question...',
    profilePicture: '',
    displayName: '',
    userMessageColor: '',
    chatIcon: 'https://via.placeholder.com/150',
    chatBubbleButtonColor: ''
  };

  const getInitialData = async () => {
    try {
      // storeId [0] - session_id [1] - customer_store_id [2]
      // const cookie = cookies.ripemetrics_chatbot?.split('-');
      const cookie = cookies[cookieName]?.split('-');
      console.log(`${islandName} - Cookie:`, cookie);
      //convert island name to use underscores instead of dashes

      const response = await axios.post(aiEndpoint, {
        session_id: cookie?.length ? cookie[1] : null,
        customer_store_id: cookie?.length ? cookie[2] : null,
        refresh: false,
        island_name: formattedIslandName
      });
      console.log(`${islandName} - Initial Data:`, response.data);

      if (!cookie?.length || cookie[1] !== response.data.session_id) {
        if (islandType !== 'panel') {
          setCookie(
            cookieName,
            `${storeId}-${response.data.session_id}-${response.data.customer_store_id}`
          );
        }
      }

      return response.data as InitialBotSettings;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMessageHistory = async () => {
    try {
      const cookie = cookies[cookieName]?.split('-');

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
    getInitialData().then((data) => {
      if (data) {
        getMessageHistory().then((history) => {
          const initialMessage = createChatBotMessage(
            `👋 Hi! I am ${data.store_name} Bot. How can I help?`,
            {
              loading: false
            }
          );

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
