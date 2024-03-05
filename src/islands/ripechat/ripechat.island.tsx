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

const island = createIslandWebComponent(islandName, RipechatIsland);
island.render({
  selector: islandName,
  initialProps: {}
});
