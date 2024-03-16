import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import OtherExampleComponent from 'src/components/internal-components/other-example/other-example';
import { useEffect, useRef } from 'preact/hooks';
import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';

const islandName = 'other-example-island';

const storeId = document.currentScript?.getAttribute('chatbotId') as
  | string
  | undefined;

export const OtherExampleIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return (
    <OtherExampleComponent
      data-testid="OtherExampleIsland"
      islandName={islandName}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, OtherExampleIsland);
island.render({
  selector: islandName
});
