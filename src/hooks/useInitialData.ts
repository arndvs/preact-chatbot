import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface InitialBotSettings {
  store_name: string;
  store_logo: string;
  brand_color: string;
  session_id: string;
  customer_store_id: string;
  store_id: string;
}

export const useInitialData = (storeId: string) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);
  const [cookies, setCookie] = useCookies(['ripemetrics_chatbot']);

  const getInitialData = async () => {
    try {
      const cookie = cookies.ripemetrics_chatbot;
      // Split the cookie to get the storeId, sessionId, and customer_store_id
      if (cookie) {
        const splitCookie = cookie.split('-');

        const response = await axios.post(
          `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${splitCookie[0]}`,
          {
            session_id: splitCookie[1],
            customer_store_id: splitCookie[2]
          }
        );
        return response.data as InitialBotSettings;
      } else {
        const response = await axios.post(
          `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${storeId}/`,
          {
            session_id: null,
            customer_store_id: null
          }
        );
        setCookie(
          'ripemetrics_chatbot',
          `${storeId}-${response.data.session_id}-${response.data.customer_store_id}`
        );
        return response.data as InitialBotSettings;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getInitialData().then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
