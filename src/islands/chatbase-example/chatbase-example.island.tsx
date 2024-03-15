import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatbaseExampleComponent from 'src/components/internal-components/chatbase-example/chatbase-example';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'chatbase-example-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ChatbaseExampleIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatbaseExampleComponent
      data-testid="ChatbaseExampleIsland"
      islandName={islandName}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ChatbaseExampleIsland);
island.render({
  selector: islandName
});
