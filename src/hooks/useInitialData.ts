import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

interface InitialBotSettings {
  store_name: string;
  store_logo: string;
  brand_color: string;
  session_id: string;
}

export const useInitialData = (storeId: string) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);

  const getInitialData = async () => {
    try {
      const response = await axios.get(
        `https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/${storeId}`
      );
      return response.data as InitialBotSettings;
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
