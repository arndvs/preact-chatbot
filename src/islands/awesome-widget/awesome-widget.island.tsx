import { createIsland, createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'
import { Box, Button, Text } from '../../components'
import * as styles from './awesome-widget.css'
import cx from 'clsx'


const islandName = 'awesome-widget-island'

export const AwesomeWidget  = ({backgroundColor,
}: {
  backgroundColor?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)



    return  (
    <>
   <div>
      <button
        className={styles.button}
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsOpen(true)}
        data-testid="callToAction"
      >
        {!isOpen ? 'Close' : 'Open'} Modal
      </button>

      {isOpen && (
        // <Portalize name="starter-modal" parent={islandName}>
          <Box
            data-testId="modal-content"
            className={cx(styles.modal, isOpen && styles.modalVisible)}
          >
            <img
              className={styles.image}
              src="https://github.com/mwood23/preact-island/raw/master/docs/preact-island.svg"
            />
            <Text>Portals work with web component islands too!</Text>
            <Button className="cta_button" onClick={() => setIsOpen(false)}>
              close
            </Button>
          </Box>
        // </Portalize>
      )}
      {isOpen && (
        // <Portalize name="starter-dimmer" parent={islandName}>
          <Box
            data-testId="modal-dimmer"
            className={cx(styles.dimmer, isOpen && styles.dimmerVisible)}
            onClick={() => setIsOpen(false)}
          />
        // </Portalize>
      )}
    </div>
    </>


    )
  }

// const islandName = 'awesome-widget-island'


// const island = createIsland(AwesomeWidget )
// island.render({
//   selector: 'awesome-widget-island',
// })


const island = createIslandWebComponent(islandName, AwesomeWidget )
island.render({
  selector: islandName,
})
