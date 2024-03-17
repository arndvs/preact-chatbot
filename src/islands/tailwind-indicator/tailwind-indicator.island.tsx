import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useDynamicWebIsland } from 'src/hooks/useDynamicWebComponent';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import TailwindIndicatorComponent from 'src/components/internal-components/tailwind-indicator';

const islandName = 'tailwind-indicator-island';

export const TailwindIndicatorIsland = () => {
  useWebComponentEvents(islandName);
  useDynamicWebIsland(islandName);

  return <TailwindIndicatorComponent data-testid="TailwindIndicatorIsland" />;
};

const island = createIslandWebComponent(islandName, TailwindIndicatorIsland);
island.render({
  selector: islandName
});
