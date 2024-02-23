import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import * as styles from 'src/styles/taco.css';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'taco-island';

export const Taco = () => {
  useWebComponentEvents(islandName);

  return (
    <div>
      <button
        className={styles.button}
        data-testid="Taco"
      >
        Taco
      </button>
    </div>
  );
};

const island = createIslandWebComponent(islandName, Taco);
island.render({
  selector: islandName
});
