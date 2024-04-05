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

export const useInitialData = (storeId: string) => {
  const [data, setData] = useState<InitialBotSettings | null>(null);
  const [cookies, setCookie] = useCookies(['ripemetrics_chatbot']);
  let aiEndpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${storeId}`;
  if (storeId === '97') {
    aiEndpoint =
      'https://api.rmdevs.com/api/v2/external_chatbot_initial_settings/97';
  }

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
      const cookie = cookies.ripemetrics_chatbot?.split('-');
      console.log('Cookie:', cookie);

      const response = await axios.post(aiEndpoint, {
        session_id: cookie?.length ? cookie[1] : null,
        customer_store_id: cookie?.length ? cookie[2] : null,
        refresh: false
      });

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
