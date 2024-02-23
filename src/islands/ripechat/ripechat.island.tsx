import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ChatIsland from 'src/components/chat/chat-island-component';

const islandName = 'ripechat-island';

export const RipechatIsland = () => {
  console.log('Ripechat mounted');
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
