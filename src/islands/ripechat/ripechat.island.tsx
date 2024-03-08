import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatIslandComponent from 'src/components/chat/chatbot/chat-island-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'ripechat-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const RipechatIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatIslandComponent
      islandName={islandName}
      data-testid="RipechatIsland"
      storeId={storeId}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, RipechatIsland);
island.render({
  selector: islandName
});
