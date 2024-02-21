import React from 'react';

import Chat from './Chat';

import ChatbotError from './chatbot-error';

import IConfig from 'src/types/IConfig';

import {
  getCustomStyles,
  getCustomComponents,
  getBotName,
  getCustomMessages,
  isConstructor
} from '../../utils/chatbot-config-utils';

import useChatbot from 'src/hooks/useChatbot';
import { IMessage } from 'src/types/IMessages';
import { createChatBotMessage } from '../../utils/chatbot-message-utils';

interface IChatbotProps {
  chatbotActionProvider: any;
  chatbotMessageParser: any;
  config: IConfig;
  headerText?: string;
  placeholderText?: string;
  saveMessages?: (ref: any) => any;
  messageHistory?: IMessage[] | string;
  validator?: (input: string) => Boolean;
  runInitialMessagesWithHistory?: Boolean;
  disableScrollToBottom?: boolean;
}

const Chatbot = ({
  chatbotActionProvider,
  chatbotMessageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  runInitialMessagesWithHistory,
  disableScrollToBottom,
  validator,
  ...rest
}: IChatbotProps) => {
  const {
    configurationError,
    invalidPropsError,
    ChatbotActionProvider,
    ChatbotMessageParser,
    widgetRegistry,
    messageContainerRef,
    actionProv,
    messagePars,
    state,
    setState
  } = useChatbot({
    config,
    chatbotActionProvider,
    chatbotMessageParser,
    messageHistory,
    saveMessages,
    runInitialMessagesWithHistory,
    ...rest
  });

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

  if (
    isConstructor(ChatbotActionProvider) &&
    isConstructor(ChatbotMessageParser)
  ) {
    return (
      <Chat
        state={state}
        setState={setState}
        widgetRegistry={widgetRegistry}
        chatbotActionProvider={actionProv}
        chatbotMessageParser={messagePars}
        customMessages={customMessages}
        customComponents={{ ...customComponents }}
        botName={botName}
        customStyles={{ ...customStyles }}
        headerText={headerText}
        placeholderText={placeholderText}
        validator={validator}
        messageHistory={messageHistory}
        disableScrollToBottom={disableScrollToBottom}
        messageContainerRef={messageContainerRef}
      />
    );
  } else {
    return (
      <ChatbotActionProvider
        state={state}
        setState={setState}
        createChatBotMessage={createChatBotMessage}
      >
        <ChatbotMessageParser>
          <Chat
            state={state}
            setState={setState}
            widgetRegistry={widgetRegistry}
            chatbotActionProvider={ChatbotActionProvider}
            chatbotMessageParser={ChatbotMessageParser}
            customMessages={customMessages}
            customComponents={{ ...customComponents }}
            botName={botName}
            customStyles={{ ...customStyles }}
            headerText={headerText}
            placeholderText={placeholderText}
            validator={validator}
            messageHistory={messageHistory}
            disableScrollToBottom={disableScrollToBottom}
            messageContainerRef={messageContainerRef}
          />
        </ChatbotMessageParser>
      </ChatbotActionProvider>
    );
  }
};

export default Chatbot;
