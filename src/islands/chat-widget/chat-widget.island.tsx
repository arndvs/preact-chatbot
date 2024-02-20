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
import { ChatIcon } from 'src/assets/chat-icon'
import { ChevronDownIcon } from 'src/assets/chevron-down-icon'

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
    <>
    {/* <div id="chat-bubble-button" className={styles.chatBubbleButton}>
  <div className={styles.chatBubbleButtonContent}>
  <ChatIcon
                  className="text-blue mr-2 h-5 w-5 "
                  aria-hidden="true"
                />{' '}

  </div>
</div> */}

    <div>
    <button
      className={styles.chatBubbleButton}

      onClick={() => setIsOpen(!isOpen)}
      data-testid="chat-bubble-button"
    >
      <div className={styles.chatBubbleButtonContent}>
  {!isOpen ? ( <ChatIcon
                  className={styles.chatBubbleButtonImage}
                  aria-hidden="true"
                />) : (
                    <>
                    <ChevronDownIcon
                    className={styles.chatBubbleButtonImage}
                    aria-hidden="true"
                    />
                    </>

                )}

  </div>
    </button>

    {isOpen && (
      <Portalize name="chat-dialog" parent={islandName}>
        <Box
          data-testId="modal-content"
          className={cx(styles.chatDialog, isOpen && styles.chatDialogVisible)}
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
      <Portalize name="chat-dialog-dimmer" parent={islandName}>
        <Box
          data-testId="modal-dimmer"
          className={cx(styles.chatDialogDimmer, isOpen && styles.chatDialogDimmerVisible)}
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
