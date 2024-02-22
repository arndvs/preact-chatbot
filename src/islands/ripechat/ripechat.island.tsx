import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat/chat-island-component';

const islandName = 'ripechat-island';

export const Ripechat = () => {
  console.log('Ripechat mounted');
  return <ChatIsland islandName={islandName} />;
};

// const island = createIslandWebComponent(islandName, Ripechat);
// island.render({
//   selector: islandName,
//   initialProps: {}
// });

createIslandWebComponent(islandName, Ripechat).render({
  selector: islandName,
  initialProps: {}
});
