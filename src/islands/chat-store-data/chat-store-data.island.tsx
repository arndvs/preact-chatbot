import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ChatStoreDataComponent from 'src/components/chat/chatbot/chat-store-data-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'chat-store-data-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ChatStoreDataComponentIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatStoreDataComponent
      data-testid="ChatContextIsland"
      storeId={storeId}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(
  islandName,
  ChatStoreDataComponentIsland
);
island.render({
  selector: islandName
});
