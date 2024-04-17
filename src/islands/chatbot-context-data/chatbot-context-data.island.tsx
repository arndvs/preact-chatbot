import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import ChatbotContextDataComponent from 'src/components/client-components/chatbot-context-data-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatIslandProps from 'src/utils/client-chat-island-props';

const islandName = 'chatbot-context-data-island';

const { storeId, env } = ClientChatIslandProps();

const islandType = 'context-data';

export const ChatbotContextDataIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatbotContextDataComponent
      data-testid="ChatbotContextDataIsland"
      storeId={storeId}
      env={env}
      islandType={islandType}
      islandName={islandName}
    />
  );
};

const island = createIslandWebComponent(islandName, ChatbotContextDataIsland);
island.render({
  selector: islandName
});
