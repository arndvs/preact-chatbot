import { useState, useRef, useEffect } from 'preact/hooks';
import {
  createClientMessage,
  createChatBotMessage,
  createCustomMessage
} from 'src/utils/chatbot-message-utils';
import {
  getInitialState,
  getWidgets,
  isConstructor,
  validateProps
} from 'src/utils/chatbot-config-utils';
import ChatbotWidgetRegistry from 'src/utils/chatbot-widget-registry';
import IChatbotConfig from 'src/types/IChatbotConfig';
import { IChatbotMessage } from 'src/types/IChatbotMessages';
import IChatbotWidget from 'src/types/IChatbotWidget';

interface IUseChatbotParams {
  config: IChatbotConfig | null;
  chatbotActionProvider: any;
  messageParser: any;
  messageHistory?: IChatbotMessage[] | string;
  saveMessages?: (messages: IChatbotMessage[], html: string) => any | null;
  runInitialMessagesWithHistory?: Boolean;
}

const useChatbot = ({
  config,
  chatbotActionProvider,
  messageParser,
  messageHistory,
  runInitialMessagesWithHistory,
  saveMessages,
  ...rest
}: IUseChatbotParams) => {
  let configurationError = '';
  let invalidPropsError = '';

  if (!config || !chatbotActionProvider || !messageParser) {
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

  const initialState = getInitialState(config);

  if (messageHistory && Array.isArray(messageHistory)) {
    config.initialMessages = [...messageHistory];
  } else if (typeof messageHistory === 'string' && Boolean(messageHistory)) {
    if (!runInitialMessagesWithHistory) {
      config.initialMessages = [];
    }
  }

  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...initialState
  });
  const messagesRef = useRef(state.messages);
  const stateRef = useRef();
  const messageContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    messagesRef.current = state.messages;
  });

  useEffect(() => {
    if (messageHistory && Array.isArray(messageHistory)) {
      setState((prevState: any) => ({
        ...prevState,
        messages: messageHistory
      }));
    }
  }, []);

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
    stateRef.current = state;
  }, [state]);

  let actionProv;
  let widgetRegistry: ChatbotWidgetRegistry;
  let messagePars;
  let widgets;

  const ChatbotActionProvider = chatbotActionProvider;
  const MessageParser = messageParser;

  if (isConstructor(ChatbotActionProvider) && isConstructor(MessageParser)) {
    actionProv = new chatbotActionProvider(
      createChatBotMessage,
      setState,
      createClientMessage,
      stateRef.current,
      createCustomMessage,
      rest
    );

    widgetRegistry = new ChatbotWidgetRegistry(setState, actionProv);
    messagePars = new messageParser(actionProv, stateRef.current);

    widgets = getWidgets(config);
    widgets.forEach((widget: IChatbotWidget) =>
      widgetRegistry?.addWidget(widget, rest)
    );
  } else {
    actionProv = chatbotActionProvider;
    messagePars = messageParser;
    widgetRegistry = new ChatbotWidgetRegistry(setState, null);

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
    state,
    setState,
    messageContainerRef,
    ChatbotActionProvider,
    MessageParser
  };
};

export default useChatbot;
