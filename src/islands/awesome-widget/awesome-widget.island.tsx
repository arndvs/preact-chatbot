import { createIslandWebComponent } from 'preact-island'


export const AwesomeWidget = () => {
    return <div>awesome widget!</div>
  }

const islandName = 'awesome-widget-island'


const island = createIslandWebComponent(islandName, AwesomeWidget )
island.render({
  selector: islandName,
})
