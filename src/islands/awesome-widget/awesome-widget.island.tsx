import { createIsland, createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'



export const AwesomeWidget = () => {

    const [isOpen, setIsOpen] = useState(false)



    return  <div>
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
  }

// const islandName = 'awesome-widget-island'


const island = createIsland(AwesomeWidget )
island.render({
  selector: 'awesome-widget-island',
})


// const island = createIslandWebComponent(islandName, AwesomeWidget )
// island.render({
//   selector: islandName,
// })
