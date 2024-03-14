import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import TailwindScreensizeComponent from 'src/components/internal-components/tailwind-screensize';

const islandName = 'tailwind-screesize-island';

export const TailwindScreensizeIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return <TailwindScreensizeComponent data-testid="TailwindScreensizeIsland" />;
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, TailwindScreensizeIsland);
island.render({
  selector: islandName
});
