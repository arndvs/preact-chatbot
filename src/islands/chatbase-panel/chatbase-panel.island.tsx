import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatbaseExampleComponent from 'src/components/internal-components/chatbase-example/chatbase-example';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import ChatbasePanel from 'src/components/internal-components/chatbase-example/chatbase-panel';

const islandName = 'chatbase-panel-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

export const ChatbasePanelIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return <ChatbasePanel data-testid="ChatbasePanelIsland" />;
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ChatbasePanelIsland);
island.render({
  selector: islandName
});
