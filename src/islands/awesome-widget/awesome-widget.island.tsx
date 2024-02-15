import { createIsland, createIslandWebComponent } from 'preact-island'
import { useState } from 'preact/hooks'
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import { FC } from 'preact/compat'

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



    return  <div>
    <button


      onClick={() => setIsOpen(true)}
      data-testid="callToAction"
    >
      Click here to open
    </button>

    {isOpen && (
        <Portalize name="starter-modal" parent={islandName}><div> is open  </div></Portalize>

    )}

    </div>
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
