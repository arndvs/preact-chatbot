import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'client-chat-button-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);
  //   useDynamicWebIsland(islandName);

  document.addEventListener('DOMContentLoaded', function () {
    // Check if the element with the specified name already exists
    if (!document.querySelector(islandName)) {
      // If it doesn't exist, create a new element
      const element = document.createElement(islandName);
      // Append the newly created element to the end of the document body
      document.body.appendChild(element);
    }
  });
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
