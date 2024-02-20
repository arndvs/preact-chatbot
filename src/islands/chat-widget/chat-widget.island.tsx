import { createIslandWebComponent } from "preact-island"

import Chatbot from "src/components/chat-widget/Chatbot/Chatbot"
import ActionProvider from "src/components/chat-widget/action-provider"
import ChatConfig from "src/components/chat-widget/chat-config"
import MessageParser from "src/components/chat-widget/message-parser"
import * as styles from './chat-widget.css'
import { useWebComponentEvents } from "src/hooks/useWebComponentEvents"

export const ChatWidget  = () => {

    useWebComponentEvents(islandName)

    return  (
        <>
          <Chatbot
            config={ChatConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
          </>


    )
  }


const islandName = 'chat-widget-island'

const island = createIslandWebComponent(islandName, ChatWidget )
island.render({
  selector: islandName,
})
