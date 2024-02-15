import '../../reset.css'

import { createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'

const islandName = 'awesome-widget-island'


export const AwesomeWidget = () => {

    const [isOpen, setIsOpen] = useState(false)



    return  (
        <div>
        <button

          onClick={() => setIsOpen(true)}

        >
          Click here to open
        </button>

        {isOpen && (

              <button onClick={() => setIsOpen(false)}>
                close
              </button>


        )}

      </div>
    )
  }

const island = createIslandWebComponent(islandName, AwesomeWidget )
island.render({
  selector: islandName,
})
