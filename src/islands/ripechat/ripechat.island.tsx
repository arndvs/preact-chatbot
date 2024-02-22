import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat/chat-island-component';

const islandName = 'ripe-chat-island';

export const RipeChat = () => {
  return <ChatIsland islandName={islandName} />;
};

const island = createIslandWebComponent(islandName, RipeChat);
island.render({
  selector: islandName
});
