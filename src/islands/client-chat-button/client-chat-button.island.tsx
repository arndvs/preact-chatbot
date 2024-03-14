import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'client-chat-button-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ClientChatButtonComponent
      islandName={islandName}
      data-testid="ClientChatButtonIsland"
      storeId={storeId}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ClientChatButtonIsland);
island.render({
  selector: islandName
});
