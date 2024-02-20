import { createIslandWebComponent, WebComponentPortal } from 'preact-island'

import { useState } from 'preact/hooks'
import Chatbot from "src/components/chat-widget/Chatbot/Chatbot"
import ActionProvider from "src/components/chat-widget/action-provider"
import ChatConfig from "src/components/chat-widget/chat-config"
import MessageParser from "src/components/chat-widget/message-parser"
import * as styles from './chat-widget.css'
import { useWebComponentEvents } from "src/hooks/useWebComponentEvents"
import { FC } from 'preact/compat'
import cx from 'clsx'
import { Box, Button, Text } from '../../components'

const Portalize: FC<{ name: string; parent: string }> = ({
    children,
    name,
    parent,
  }) => {
    useWebComponentEvents(name, parent)

    // @ts-ignore types are wrong
    return <WebComponentPortal name={name}>{children}</WebComponentPortal>
  }



export const ChatWidget  = () => {


    const [isOpen, setIsOpen] = useState(false)
    useWebComponentEvents(islandName)

    return  (
    <><div>
    <button
      className={styles.button}

      onClick={() => setIsOpen(true)}
      data-testid="subscribeEmail"
    >
      Chat Widget
    </button>

    {isOpen && (
      <Portalize name="starter-modal" parent={islandName}>
        <Box
          data-testId="modal-content"
          className={cx(styles.modal, isOpen && styles.modalVisible)}
        >
          <Chatbot
            config={ChatConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />

        </Box>
      </Portalize>
    )}
    {isOpen && (
      <Portalize name="starter-dimmer" parent={islandName}>
        <Box
          data-testId="modal-dimmer"
          className={cx(styles.dimmer, isOpen && styles.dimmerVisible)}
          onClick={() => setIsOpen(false)}
        />
      </Portalize>
    )}
  </div>


    </>
    )
  }


const islandName = 'chat-widget-island'

const island = createIslandWebComponent(islandName, ChatWidget )
island.render({
  selector: islandName,
})
