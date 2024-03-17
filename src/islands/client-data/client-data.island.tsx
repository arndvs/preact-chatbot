import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ClientDataComponent from 'src/components/client-components/client-data-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'client-data-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

export const ClientDataIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ClientDataComponent
      data-testid="ClientDataIsland"
      storeId={storeId}
    />
  );
};

const island = createIslandWebComponent(islandName, ClientDataIsland);
island.render({
  selector: islandName
});
