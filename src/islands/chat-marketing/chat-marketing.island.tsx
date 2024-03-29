import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatMarketingComponent from 'src/components/internal-components/marketing-example/marketing-example';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'chat-marketing-island';

export const ChatMarketingIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatMarketingComponent
      data-testid="ChatMarketingIsland"
      islandName={islandName}
    />
  );
};

const island = createIslandWebComponent(islandName, ChatMarketingIsland);
island.render({
  selector: islandName
});
