import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatPanelComponent from 'src/components/client-components/client-chat-panel-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import ClientChatIslandProps from 'src/utils/client-chat-island-props';

const islandName = 'client-chat-panel-island';

const { storeId, domain, env, islandType } = ClientChatIslandProps();

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
        env={env}
        islandType={islandType}
      />
    </>
  );
};

const island = createIslandWebComponent(islandName, ClientChatPanelIsland);
island.render({
  selector: islandName
});
