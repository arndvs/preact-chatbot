import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatPanelComponent from 'src/components/client-components/client-chat-panel-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'client-chat-panel-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

const domain = document.currentScript?.getAttribute('domain') as
  | string
  | undefined;

export const ClientChatPanelIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <>
      <ClientChatPanelComponent
        islandName={islandName}
        data-testid="ClientChatPanelIsland"
        storeId={storeId}
        domain={domain}
      />
    </>
  );
};

const island = createIslandWebComponent(islandName, ClientChatPanelIsland);
island.render({
  selector: islandName
});
