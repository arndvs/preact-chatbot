import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatPanelComponent from 'src/components/client-components/client-chat-panel-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'client-chat-panel-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
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
      />
    </>
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ClientChatPanelIsland);
island.render({
  selector: islandName
});
