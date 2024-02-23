import ChatbotContainer from 'src/components/chat/chatbot-container';
import useChatbot from 'src/hooks/useChatbot';
import { IChatbotWidgetProps } from 'src/types/IChatbotWidget';
import {
  getBotName,
  getCustomComponents,
  getCustomMessages,
  getCustomStyles,
  isConstructor
} from 'src/utils/chatbot-config-utils';
import { createChatBotMessage } from 'src/utils/chatbot-message-utils';
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

  if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
    return (
      <ChatbotContainer
        state={state}
        setState={setState}
        widgetRegistry={widgetRegistry}
        actionProvider={actionProv}
        messageParser={messagePars}
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
      <ActionProvider
        state={state}
        setState={setState}
        createChatBotMessage={createChatBotMessage}
      >
        <MessageParser>
          <ChatbotContainer
            state={state}
            setState={setState}
            widgetRegistry={widgetRegistry}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
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
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default ChatbotWidget;
