import '../../reset.css'

import { createIsland, createIslandWebComponent, WebComponentPortal } from 'preact-island'
import { useState, useEffect } from 'preact/hooks';
import cx from 'clsx'
import { Box, Button, Text } from '../../components'
import * as styles from './cool-widget.css'
import { FC } from 'preact/compat'
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents'

const islandName = 'cool-widget-island'

// const Portalize: FC<{ name: string; parent: string }> = ({
//   children,
//   name,
//   parent,
// }) => {
//   useWebComponentEvents(name, parent)

//   // @ts-ignore types are wrong
//   return <WebComponentPortal name={name}>{children}</WebComponentPortal>
// }

export const CoolWidget = () => {


  useWebComponentEvents(islandName)

  return (
    <div>
      <button
        className={styles.bgGreen}

      >
       Cool Widget
      </button>


    </div>
  )

}

const island = createIslandWebComponent(islandName, CoolWidget)
    island.render({
    selector: islandName,
    })
