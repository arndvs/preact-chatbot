import ChatbotContainer from 'src/components/chat/chatbot-container';
import useChatbot from 'src/hooks/useChatbot';
import { IChatbotWidgetProps } from 'src/types/IChatbotWidget';
import {
  getBotName,
  getCustomComponents,
  getCustomMessages,
  getCustomStyles,
  isConstructor
} from 'src/actions/chatbot-config-utils';
import { createChatBotMessage } from 'src/actions/chatbot-message-utils';
import ChatbotError from './chatbot-error';

const ChatbotWidget = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
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
    customStyles,
    headerText,
    placeholderText,
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
      >
        <MessageParser>
          <ChatbotContainer {...chatbotContainerProps} />
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default ChatbotWidget;
