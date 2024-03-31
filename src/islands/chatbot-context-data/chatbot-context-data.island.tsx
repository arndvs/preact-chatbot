import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ChatbotContextDataComponent from 'src/components/client-components/chatbot-context-data-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'chatbot-context-data-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

export const ChatbotContextDataIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatbotContextDataComponent
      data-testid="ChatbotContextDataIsland"
      storeId={storeId}
    />
  );
};

const island = createIslandWebComponent(islandName, ChatbotContextDataIsland);
island.render({
  selector: islandName
});
