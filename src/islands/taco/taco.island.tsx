import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import * as styles from 'src/styles/taco.css';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

const islandName = 'taco-island';

export const Taco = ({ backgroundColor }: { backgroundColor?: string }) => {
  useWebComponentEvents(islandName);

  return (
    <div>
      <button
        className={styles.button}
        style={{ backgroundColor: backgroundColor }}
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
