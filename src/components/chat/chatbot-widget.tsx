import ChatbotError from './chatbot-error';
import IChatbotConfig from 'src/types/IChatbotConfig';
import {
  getBotName,
  getCustomComponents,
  getCustomMessages,
  getCustomStyles,
  isConstructor
} from 'src/utils/chatbot-config-utils';
import useChatbot from 'src/hooks/useChatbot';
import { IChatbotMessage } from 'src/types/IChatbotMessages';
import { createChatBotMessage } from 'src/utils/chatbot-message-utils';
import ChatbotContainer from 'src/components/chat/chatbot-container';

interface IChatbotProps {
  actionProvider: any;
  messageParser: any;
  config: IChatbotConfig;
  headerText?: string;
  placeholderText?: string;
  saveMessages?: (ref: any) => any;
  messageHistory?: IChatbotMessage[] | string;
  validator?: (input: string) => Boolean;
  runInitialMessagesWithHistory?: Boolean;
  disableScrollToBottom?: boolean;
}

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
}: IChatbotProps) => {
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
