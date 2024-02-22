import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat/chat-island-component';

const islandName = 'ripechat-island';

export const Ripechat = () => {
  return <ChatIsland islandName={islandName} />;
};

const island = createIslandWebComponent(islandName, Ripechat);
island.render({
  selector: islandName
});
