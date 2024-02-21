import { useState, useRef, useEffect } from 'preact/hooks';
import {
  createClientMessage,
  createChatBotMessage,
  createCustomMessage
} from 'src/components/chat-island/chatUtils';
import {
  getInitialState,
  getWidgets,
  isConstructor,
  validateProps
} from 'src/components/chat-island/utils';
import WidgetRegistry from 'src/components/chat-island/WidgetRegistry';
import IConfig from 'src/types/IConfig';
import { IMessage } from 'src/types/IMessages';
import IWidget from 'src/types/IWidget';

interface IUseChatbotParams {
  config: IConfig | null;
  chatbotActionProvider: any;
  chatbotMessageParser: any;
  messageHistory?: IMessage[] | string;
  saveMessages?: (messages: IMessage[], html: string) => any | null;
  runInitialMessagesWithHistory?: Boolean;
}

const useChatbot = ({
  config,
  chatbotActionProvider,
  chatbotMessageParser,
  messageHistory,
  runInitialMessagesWithHistory,
  saveMessages,
  ...rest
}: IUseChatbotParams) => {
  let configurationError = '';
  let invalidPropsError = '';

  if (!config || !chatbotActionProvider || !chatbotMessageParser) {
    configurationError =
      'I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?';

    return { configurationError };
  }

  const propsErrors = validateProps(config, chatbotMessageParser);

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
  let widgetRegistry: WidgetRegistry;
  let messagePars;
  let widgets;

  const ChatbotActionProvider = chatbotActionProvider;
  const ChatbotMessageParser = chatbotMessageParser;

  if (
    isConstructor(ChatbotActionProvider) &&
    isConstructor(ChatbotMessageParser)
  ) {
    actionProv = new chatbotActionProvider(
      createChatBotMessage,
      setState,
      createClientMessage,
      stateRef.current,
      createCustomMessage,
      rest
    );

    widgetRegistry = new WidgetRegistry(setState, actionProv);
    messagePars = new chatbotMessageParser(actionProv, stateRef.current);

    widgets = getWidgets(config);
    widgets.forEach((widget: IWidget) =>
      widgetRegistry?.addWidget(widget, rest)
    );
  } else {
    actionProv = chatbotActionProvider;
    messagePars = chatbotMessageParser;
    widgetRegistry = new WidgetRegistry(setState, null);

    widgets = getWidgets(config);
    widgets.forEach((widget: IWidget) =>
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
    ChatbotMessageParser
  };
};

export default useChatbot;
