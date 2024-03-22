import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'client-chat-button-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

const domain = document.currentScript?.getAttribute('domain') as
  | string
  | undefined;

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  console.log('storeId', storeId);

  return (
    <ClientChatButtonComponent
      islandName={islandName}
      data-testid="ClientChatButtonIsland"
      storeId={storeId}
      domain={domain}
    />
  );
};

const island = createIslandWebComponent(islandName, ClientChatButtonIsland);
island.render({
  selector: islandName
});
