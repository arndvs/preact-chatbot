import axios from 'axios';
import { getChatApiUrl } from 'src/config/chat-api-url';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import { useSession } from 'src/hooks/useSession';

const ChatBotHeaderResetChatButton = () => {
  const {
    store_id,
    resetChatTimeline,
    env,
    islandName,
    islandType,
    chatHeadingFontColor
  } = useChatbotContext();
  const { session, setSession } = useSession(islandType || 'default');

  const handleResetChat = async () => {
    const chatApiUrl = getChatApiUrl(env);

    const endpoint = `${chatApiUrl}/api/v2/external_chatbot_initial_settings/${store_id}`;

    try {
      const formattedIslandName = islandName.replace(/-/g, '_');
      const response = await axios.post(endpoint, {
        session_id: session.sessionId ?? null,
        customer_store_id: session.customerStoreId ?? null,
        refresh: true,
        island_name: formattedIslandName
      });

      setSession(
        store_id,
        response.data.session_id,
        response.data.customer_store_id
      );

      if (response?.data) {
        const pusherClient = (window as any).__pusherClient;
        if (pusherClient && session.sessionId) {
          pusherClient.unsubscribe(`chat-stream-external-${store_id}-${session.sessionId}`);
        }
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
        className="inline-flex items-center justify-center px-0 py-3 !text-sm font-medium transition-transform duration-700 ease-in-out rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-gray-50 h-9 hover:rotate-180 hover:bg-inherit "
        aria-label="Reset Chat"
        title="Reset Chat"
        style={{
          color: chatHeadingFontColor ?? '#fff'
        }}
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
