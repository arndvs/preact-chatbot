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

const islandName = 'client-chat-button-island';

const { storeId, domain, env } = ClientChatIslandProps();

const islandType = 'button';

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  useEffect(() => {
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
