import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatIslandComponent from 'src/components/chat/chatbot/chat-island-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'ripechat-island';

export const RipechatIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatIslandComponent
      islandName={islandName}
      data-testid="RipechatIsland"
    />
  );
};

//get any props on the script tag and pass them to the island
console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, RipechatIsland);
island.render({
  selector: islandName,
  propsSelector: '[data-island-props="store-id"]',
  initialProps: {
    storeId: '12345',
  },
});
