import { createIsland, createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import { FC } from 'preact/compat'
import { Box, Button, Text } from 'src/components';

const islandName = 'awesome-widget-island'



const Portalize: FC<{ name: string; parent: string }> = ({
    children,
    name,
    parent,
  }) => {
    useWebComponentEvents(name, parent)

    // @ts-ignore types are wrong
    return <WebComponentPortal name={name}>{children}</WebComponentPortal>
  }



export const AwesomeWidget = () => {

    const [isOpen, setIsOpen] = useState(false)

    useWebComponentEvents(islandName)

    return  (
        <div>
        <Button

          onClick={() => setIsOpen(true)}
          data-testid="callToAction"
        >
          Click here to open
        </Button>

        {isOpen && (
          <Portalize name="starter-modal" parent={islandName}>
            <Box
              data-testId="modal-content"

            >

              <Text>This is open</Text>
              <Button className="cta_button" onClick={() => setIsOpen(false)}>
                close
              </Button>
            </Box>
          </Portalize>
        )}
        {isOpen && (
          <Portalize name="starter-dimmer" parent={islandName}>
            <Box
              data-testId="modal-dimmer"

              onClick={() => setIsOpen(false)}
            />
          </Portalize>
        )}
      </div>
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
