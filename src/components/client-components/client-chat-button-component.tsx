import { useState } from 'preact/compat';
import { ChatbotContextProvider } from 'src/actions/chatbot/chatbot-context-provider';
import { userMessage } from 'src/actions/chatbot/chatbot-message-utils';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatModal from 'src/components/chat/chatbot/chat-modal';
import { useInitialData } from 'src/hooks/useInitialData';

interface ClientChatButtonComponentProps {
  islandName: string;
  storeId: string | undefined;
  domain: string | undefined;
}

const ClientChatButtonComponent = ({
  islandName,
  storeId,
  domain
}: ClientChatButtonComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use the storeId if it is passed in, otherwise use the default storeId
  const idToUse = storeId || '20';

  // Fetch the initial store data for the chatbot
  const data = useInitialData(idToUse);

  const chatbotSettings = {
    chatHeadingColor: '#000000',
    initialMessages: ['Hi there! How can I help you today?'],
    suggestedMessages: [
      'What are your store hours?',
      'Do you offer free shipping?',
      'What is your return policy?'
    ],
    placeholderText: 'Ask a question...',
    profilePicture: 'https://via.placeholder.com/150',
    displayName: 'Chatbot',
    userMessageColor: '#000000',
    chatIcon: 'https://via.placeholder.com/150',
    chatBubbleButtonColor: ''
  };

  return (
    <>
      {data && (
        <ChatbotContextProvider
          storeName={data.store_name}
          storeLogo={data.store_logo}
          brandColor={data.brand_color}
          session_id={data.session_id}
          customer_store_id={data.customer_store_id}
          messages={data.messages}
          store_id={idToUse}
          domain={domain}
          placeholderText={chatbotSettings.placeholderText}
          chatHeadingColor={chatbotSettings.chatHeadingColor}
          //   initialMessages={chatbotSettings.initialMessages}
          suggestedMessages={chatbotSettings.suggestedMessages}
          profilePicture={chatbotSettings.profilePicture}
          displayName={chatbotSettings.displayName}
          userMessageColor={chatbotSettings.userMessageColor}
          chatIcon={chatbotSettings.chatIcon}
          chatBubbleButtonColor={chatbotSettings.chatBubbleButtonColor}
        >
          <ChatBubbleButton
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <ChatModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            islandName={islandName}
          />
        </ChatbotContextProvider>
      )}
    </>
  );
};

export default ClientChatButtonComponent;
