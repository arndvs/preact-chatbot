import { useState, useRef, useEffect } from 'preact/hooks';
import {
  createClientMessage,
  createChatBotMessage,
  createCustomMessage
} from 'src/actions/chatbot/chatbot-message-utils';
import {
  getInitialState,
  getWidgets,
  isConstructor,
  validateProps
} from 'src/actions/chatbot/chatbot-config-utils';
import ChatbotWidgetRegistry from 'src/actions/chatbot/chatbot-widget-registry';
import IChatbotConfig from 'src/types/IChatbotConfig';
import { IChatbotMessage } from 'src/types/IChatbotMessages';
import { IChatbotWidget } from 'src/types/IChatbotWidget';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface IUseChatbotParams {
  config: IChatbotConfig | null;
  actionProvider: any;
  messageParser: any;
  messageHistory?: IChatbotMessage[] | string;
  saveMessages?: (messages: IChatbotMessage[], html: string) => any | null;
  runInitialMessagesWithHistory?: Boolean;
}

const useChatbot = ({
  config,
  actionProvider,
  messageParser,
  messageHistory,
  runInitialMessagesWithHistory,
  saveMessages,
  ...rest
}: IUseChatbotParams) => {
  const { messages } = useChatbotContext();

  let configurationError = '';
  let invalidPropsError = '';

  if (!config || !actionProvider || !messageParser) {
    configurationError =
      'I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?';

    return { configurationError };
  }

  const propsErrors = validateProps(config, messageParser);

  if (propsErrors.length) {
    invalidPropsError = propsErrors.reduce((prev, cur) => {
      prev += cur;
      return prev;
    }, '');

    return { invalidPropsError };
  }
  const messagesRef = useRef(messages);
  const messageContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    messagesRef.current = messages;
  });

  useEffect(() => {
    const refValue: HTMLDivElement | undefined = messageContainerRef.current;

    return () => {
      if (refValue && saveMessages && typeof saveMessages === 'function') {
        const HTML = refValue.innerHTML.toString();

        saveMessages(messagesRef.current, HTML);
      }
    };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  let actionProv;
  let widgetRegistry: ChatbotWidgetRegistry;
  let messagePars;
  let widgets;

  const ActionProvider = actionProvider;
  const MessageParser = messageParser;

  if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
    actionProv = new actionProvider(
      createChatBotMessage,
      createClientMessage,
      createCustomMessage,
      rest
    );

    widgetRegistry = new ChatbotWidgetRegistry(actionProv);
    messagePars = new messageParser(actionProv);

    widgets = getWidgets(config);
    widgets.forEach((widget: IChatbotWidget) =>
      widgetRegistry?.addWidget(widget, rest)
    );
  } else {
    actionProv = actionProvider;
    messagePars = messageParser;
    widgetRegistry = new ChatbotWidgetRegistry(null);

    widgets = getWidgets(config);
    widgets.forEach((widget: IChatbotWidget) =>
      widgetRegistry?.addWidget(widget, rest)
    );
  }

  return {
    widgetRegistry,
    actionProv,
    messagePars,
    configurationError,
    invalidPropsError,
    messageContainerRef,
    ActionProvider,
    MessageParser
  };
};

export default useChatbot;
