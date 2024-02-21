import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat-island/chat-island';

const islandName = 'chat-island';

export const Chat = () => {
  return <ChatIsland islandName={islandName} />;
};

const island = createIslandWebComponent(islandName, Chat);
island.render({
  selector: islandName
});
