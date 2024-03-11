import ChatbotContainer from 'src/components/chat/chatbot/chatbot-container';
import useChatbot from 'src/hooks/useChatbot';
import { IChatbotWidgetProps } from 'src/types/IChatbotWidget';
import {
  getBotName,
  getCustomComponents,
  getCustomMessages,
  getCustomStyles,
  isConstructor
} from 'src/actions/chatbot/chatbot-config-utils';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import ChatbotError from './chatbot-error';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';
import { usePusher } from 'src/hooks/usePusher';

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  isOpen,
  saveMessages,
  setIsOpen,
  messageHistory,
  runInitialMessagesWithHistory,
  disableScrollToBottom,
  validator,
  ...rest
}: IChatbotWidgetProps) => {
  const {
    configurationError,
    invalidPropsError,
    ActionProvider,
    MessageParser,
    widgetRegistry,
    messageContainerRef,
    actionProv,
    messagePars,
    state,
    setState
  } = useChatbot({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    saveMessages,
    runInitialMessagesWithHistory,
    ...rest
  });
  const { echo, pusher } = usePusher();

  console.log('echo', echo);
  console.log('pusher', pusher);

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError?.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);

  const chatbotContainerProps = {
    state,
    setState,
    widgetRegistry,
    actionProvider: isConstructor(ActionProvider) ? actionProv : ActionProvider,
    messageParser: isConstructor(MessageParser) ? messagePars : MessageParser,
    customMessages,
    customComponents,
    botName,
    isOpen,
    setIsOpen,
    customStyles,
    headerText,
    validator,
    messageHistory,
    disableScrollToBottom,
    messageContainerRef
  };

  if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
    return <ChatbotContainer {...chatbotContainerProps} />;
  } else {
    return (
      <ActionProvider
        state={state}
        setState={setState}
        createChatBotMessage={createChatBotMessage}
        echo={echo}
      >
        <MessageParser>
          <ChatbotContainer {...chatbotContainerProps} />
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default Chatbot;
