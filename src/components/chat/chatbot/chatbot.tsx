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
    messagePars
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
    console.log('constructor');
    return <ChatbotContainer {...chatbotContainerProps} />;
  } else {
    console.log('Else');
    return (
      <ActionProvider createChatBotMessage={createChatBotMessage}>
        <MessageParser>
          <ChatbotContainer {...chatbotContainerProps} />
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default Chatbot;
