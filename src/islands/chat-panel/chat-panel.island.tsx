import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatPanelComponent from 'src/components/chat/chatbot/chat-panel-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'chat-panel-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ChatPanelIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <>
      <ChatPanelComponent
        islandName={islandName}
        data-testid="ChatPanelIsland"
        storeId={storeId}
      />
    </>
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ChatPanelIsland);
island.render({
  selector: islandName
});
