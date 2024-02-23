import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import * as styles from 'src/styles/taco.css';

const islandName = 'taco-island';

export const Taco = () => {
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
