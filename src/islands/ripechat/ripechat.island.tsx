import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat/chat-island-component';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'ripechat-island';

export const RipechatIsland = () => {
  console.log('Ripechat mounted');
  useWebComponentEvents(islandName);
  return (
    <ChatIsland
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
