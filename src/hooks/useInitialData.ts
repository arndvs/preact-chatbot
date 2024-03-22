import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import { chatApiUrl } from 'src/config/chat-api-url';

export interface InitialBotSettings {
  store_name: string;
  store_logo: string;
  brand_color: string;
  session_id: string;
  customer_store_id: string;
  store_id: string;
  messages: any[];
}

export const useInitialData = (storeId: string) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);
  const [cookies, setCookie] = useCookies(['ripemetrics_chatbot']);
  // const aiEndpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${storeId}`;
  const aiEndpoint = `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${storeId}`;

  const getInitialData = async () => {
    try {
      // storeId [0] - session_id [1] - customer_store_id [2]
      const cookie = cookies.ripemetrics_chatbot?.split('-');

      const response = await axios.post(
        aiEndpoint,
        {
          session_id: cookie?.length ? cookie[1] : null,
          customer_store_id: cookie?.length ? cookie[2] : null
        }
      );

      if (!cookie?.length || cookie[1] !== response.data.session_id) {
        setCookie(
          'ripemetrics_chatbot',
          `${storeId}-${response.data.session_id}-${response.data.customer_store_id}`
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
      const cookie = cookies.ripemetrics_chatbot?.split('-');

      if (!cookie?.length) return null;

      const response = await axios.get(
        `${chatApiUrl}/api/v2/external_chatbot/message_history/${cookie[2]}/${cookie[1]}`
      );
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
            messages: [initialMessage, ...(history || [])]
          });
        });
      } else {
        setData(null);
      }
    });
  }, []);

  return data;
};
