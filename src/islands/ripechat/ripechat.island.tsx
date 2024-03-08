import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ChatIslandComponent from 'src/components/chat/chatbot/chat-island-component';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'ripechat-island';

export const RipechatIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <ChatIslandComponent
      islandName={islandName}
      data-testid="RipechatIsland"
    />
  );
};

{
  /* <script data-island-props="store-id" type="text/props">
  {"storeId": "20"}
</script> */
}

//the above script tag is used to pass props to the island on the html page i need to get the props from the script tag and pass them to the island
//get the storeId from the script tag
const storeId = document.currentScript?.getAttribute(
  'data-island-props'
) as string | undefined;
console.log('storeId', storeId)

//get any props on the script tag and pass them to the island
console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, RipechatIsland);
island.render({
  selector: islandName,
  propsSelector: storeId,
  initialProps: {
    storeId: '12345'
  }
});
