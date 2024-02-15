import { createIsland, createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'
import { Box, Button, Text } from 'src/components'

const islandName = 'awesome-widget-island'

export const AwesomeWidget = () => {

    const [isOpen, setIsOpen] = useState(false)



    return  (
    <> <div>
    <button


      onClick={() => setIsOpen(true)}
      data-testid="callToAction"
    >
      Click here to open
    </button>

    {isOpen && (
        <div> is open </div>
    )}

    </div>
    <div>
      <button

        onClick={() => setIsOpen(true)}
        data-testid="callToAction"
      >
        Click here to open modal
      </button>

      {isOpen && (

          <Box
             >
            <Text>Open</Text>
            <Button className="cta_button" onClick={() => setIsOpen(false)}>
              close
            </Button>
          </Box>

      )}
      {isOpen && (

          <Box
            data-testId="modal-dimmer"

            onClick={() => setIsOpen(false)}
          />

      )}
    </div></>


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
