import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import MarketingChatbotComponent from 'src/components/internal-components/marketing-chatbot/marketing-chatbot';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import OtherPanel from 'src/components/internal-components/marketing-chatbot/marketing-panel';

const islandName = 'marketing-panel-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

export const OtherPanelIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return <OtherPanel data-testid="OtherPanelIsland" />;
};

const island = createIslandWebComponent(islandName, OtherPanelIsland);
island.render({
  selector: islandName
});
