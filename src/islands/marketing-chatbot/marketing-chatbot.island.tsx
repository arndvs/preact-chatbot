import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import MarketingChatbotComponent from 'src/components/internal-components/marketing-chatbot/marketing-chatbot';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'marketing-chatbot-island';

export const MarketingChatbotIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    // <MarketingChatbotComponent
    //   data-testid="MarketingChatbotIsland"
    //   islandName={islandName}
    // />
    <></>
  );
};

const island = createIslandWebComponent(islandName, MarketingChatbotIsland);
island.render({
  selector: islandName
});
