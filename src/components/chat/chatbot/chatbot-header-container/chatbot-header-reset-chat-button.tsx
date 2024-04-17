import axios from 'axios';
import { useCookies } from 'react-cookie';
import { getChatApiUrl } from 'src/config/chat-api-url';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import formattedCookieName from 'src/utils/formatted-cookie-name';
import formattedIslandName from 'src/utils/formatted-island-name';

const ChatBotHeaderResetChatButton = () => {
  const { store_id, resetChatTimeline, env, islandName } = useChatbotContext();

  const formattedName = formattedIslandName(islandName);
  const cookieName = formattedCookieName(formattedName);
  const [cookies, setCookie] = useCookies([cookieName]);

  const handleResetChat = async () => {
    const cookie = cookies.ripemetrics_chatbot?.split('-');

    const chatApiUrl = getChatApiUrl(env);

    const endpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${store_id}`;

    console.log('ChatBotHeaderResetChatButton - endpoint:', endpoint);
    console.log(
      'check values',
      cookie,

      islandName
    );

    try {
      const response = await axios.post(endpoint, {
        session_id: cookie?.length && cookie[1],
        customer_store_id: cookie?.length && cookie[2],
        refresh: true,
        island_name: 'formattedIslandName'
      });

      setCookie(
        cookieName,
        `${store_id}-${response.data.session_id}-${response.data.customer_store_id}`
      );

      if (response?.data) {
        //@ts-ignore
        if (window.Echo !== undefined && window.Echo !== null) {
          //@ts-ignore
          window.Echo.leave(`chat-stream-external-${store_id}-${cookie[1]}`);
          console.log(
            'Chat stream left successfully',
            `chat-stream-external-${store_id}-${cookie[1]}`
          );
        }
        console.log('Chat reset successfully', response?.data.session_id);
        resetChatTimeline(response?.data.session_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={handleResetChat}
        className="inline-flex items-center justify-center px-0 py-3 text-sm font-medium text-white transition-transform duration-700 ease-in-out rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-gray-50 h-9 hover:rotate-180 hover:bg-inherit "
        aria-label="Reset Chat"
        title="Reset Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default ChatBotHeaderResetChatButton;
