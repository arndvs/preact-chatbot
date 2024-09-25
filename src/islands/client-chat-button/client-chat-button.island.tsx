import 'src/styles/global.css';
import 'src/styles/reset.css';
import axios from 'axios';

import { createIslandWebComponent } from 'preact-island';

import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import { useCookies } from 'react-cookie';
import ClientChatIslandProps from 'src/utils/client-chat-island-props';
import { inject } from '@vercel/analytics';
import { useEffect, useState } from 'preact/hooks';
import { initSentry, withSentry } from 'src/utils/sentry';

// Initialize Sentry
// initSentry();

const islandName = 'client-chat-button-island';

const { storeId, domain, env } = ClientChatIslandProps();

const islandType = 'button';
console.log('AA storeId', storeId);

export const ClientChatButtonIsland = () => {
  const [showChatbot, setShowChatbot] = useState(true);

  useEffect(() => {
    const fetchChatbotSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.CHAT_API_URL}/v2/external_chatbot_initial_settings/${storeId}`
        );
        setShowChatbot(response.data.show_chatbot);
      } catch (error) {
        console.error('Error fetching chatbot settings:', error);
      }
    };

    fetchChatbotSettings();
  }, [storeId]);

  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  useEffect(() => {
    console.log('chatbot analytics');
    inject();
  }, []);

  if (!showChatbot) {
    console.log('Chatbot is not enabled for this store.');
    return null;
  }

  return (
    <ClientChatButtonComponent
      islandName={islandName}
      data-testid="ClientChatButtonIsland"
      storeId={storeId}
      domain={domain}
      env={env}
      islandType={islandType}
    />
  );
};

const island = createIslandWebComponent(islandName, ClientChatButtonIsland);
island.render({
  selector: islandName
});

// Wrap the island component with Sentry
// const SentryWrappedClientChatButtonIsland = withSentry(ClientChatButtonIsland);

// Create and render the island using the Sentry-wrapped component
// const island = createIslandWebComponent(
//   islandName,
//   SentryWrappedClientChatButtonIsland
// );
// island.render({
//   selector: islandName
// });
