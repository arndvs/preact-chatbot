import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import { useCookies } from 'react-cookie';
import ClientChatIslandProps from 'src/utils/client-chat-island-props';
import { inject } from '@vercel/analytics';
import { useEffect } from 'preact/hooks';
import { initSentry, withSentry } from 'src/utils/sentry';

// Initialize Sentry
// initSentry();

const islandName = 'client-chat-button-island';

const { storeId, domain, env } = ClientChatIslandProps();

const islandType = 'button';

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  useEffect(() => {
    console.log('chatbot analytics');
    inject();
  }, []);

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
