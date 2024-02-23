import { useEffect, useState } from 'preact/hooks';

import ChatbotMessage from './chatbot-message';
import ChatbotUserMessage from './chatbot-user-message';

import {
  botMessage,
  createChatMessage,
  customMessage,
  userMessage
} from 'src/utils/chatbot-message-utils';

import { ChangeEvent } from 'preact/compat';
import { AirplaneIcon } from 'src/assets/airplane-icon';
import * as styles from 'src/styles/chat-widget.css';
import {
  IChatbotCustomComponents,
  IChatbotCustomMessage,
  IChatbotCustomStyles
} from 'src/types/IChatbotConfig';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

interface IChatProps {
  setState?: (state: any) => void;
  widgetRegistry: any;
  messageParser: any;
  actionProvider: any;
  customComponents: IChatbotCustomComponents;
  botName: string;
  customStyles: IChatbotCustomStyles;
  headerText?: string;
  customMessages: IChatbotCustomMessage;
  placeholderText?: string;
  validator: ((input: string) => Boolean) | undefined;
  state: any;
  disableScrollToBottom?: boolean;
  messageHistory?: IChatbotMessage[] | string;
  parse?: (message: string) => void;
  actions?: object;
  messageContainerRef: any;
}

const Chatbot = ({
  state,
  setState,
  widgetRegistry,
  messageParser,
  parse,
  customComponents,
  actionProvider,
  botName,
  customStyles,
  headerText,
  customMessages,
  placeholderText,
  validator,
  disableScrollToBottom,
  messageHistory,
  actions,
  messageContainerRef
}: IChatProps) => {
  const { messages } = state;

  const [input, setInputValue] = useState('');

  const scrollIntoView = () => {
    setTimeout(() => {
      if (messageContainerRef?.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef?.current?.scrollHeight;
      }
    }, 50);
  };

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView();
  });

  const showAvatar = (messages: any[], index: number) => {
    if (index === 0) return true;

    const lastMessage = messages[index - 1];

    if (lastMessage.type === 'bot' && !lastMessage.widget) {
      return false;
    }
    return true;
  };

  const renderMessages = () => {
    return messages.map((messageObject: IChatbotMessage, index: number) => {
      if (botMessage(messageObject)) {
        return (
          <div key={messageObject.id}>
            {renderChatbotMessage(messageObject, index)}
          </div>
        );
      }

      if (userMessage(messageObject)) {
        return (
          <div key={messageObject.id}>{renderUserMessage(messageObject)}</div>
        );
      }

      if (customMessage(messageObject, customMessages)) {
        return (
          <div key={messageObject.id}>{renderCustomMessage(messageObject)}</div>
        );
      }
    });
  };

  const renderCustomMessage = (messageObject: IChatbotMessage) => {
    const customMessage = customMessages[messageObject.type];

    const props = {
      setState,
      state,
      scrollIntoView,
      actionProvider,
      payload: messageObject.payload,
      actions
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(messageObject.widget, {
        ...state,
        scrollIntoView,
        payload: messageObject.payload,
        actions
      });
      return (
        <>
          {customMessage(props)}
          {widget ? widget : null}
        </>
      );
    }

    return customMessage(props);
  };

  const renderUserMessage = (messageObject: IChatbotMessage) => {
    const widget = widgetRegistry.getWidget(messageObject.widget, {
      ...state,
      scrollIntoView,
      payload: messageObject.payload,
      actions
    });
    return (
      <>
        <ChatbotUserMessage
          message={messageObject.message}
          key={messageObject.id}
          customComponents={customComponents}
        />
        {widget ? widget : null}
      </>
    );
  };

  const renderChatbotMessage = (
    messageObject: IChatbotMessage,
    index: number
  ) => {
    let withAvatar;
    if (messageObject.withAvatar) {
      withAvatar = messageObject.withAvatar;
    } else {
      withAvatar = showAvatar(messages, index);
    }

    const chatbotMessageProps = {
      ...messageObject,
      setState,
      state,
      customComponents,
      widgetRegistry,
      messages,
      actions
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(chatbotMessageProps.widget, {
        ...state,
        scrollIntoView,
        payload: messageObject.payload,
        actions
      });
      return (
        <>
          <ChatbotMessage
            customStyles={customStyles.botMessageBox}
            withAvatar={withAvatar}
            {...chatbotMessageProps}
            key={messageObject.id}
          />
          {chatbotMessageProps.loading !== undefined &&
            !chatbotMessageProps.loading &&
            (widget ? widget : null)}
        </>
      );
    }

    return (
      <ChatbotMessage
        customStyles={customStyles.botMessageBox}
        key={messageObject.id}
        withAvatar={withAvatar}
        {...chatbotMessageProps}
        customComponents={customComponents}
        messages={messages}
        setState={setState}
      />
    );
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validator && typeof validator === 'function') {
      if (validator(input)) {
        handleValidMessage();
        if (parse) {
          return parse(input);
        }
        messageParser.parse(input);
      }
    } else {
      handleValidMessage();
      if (parse) {
        return parse(input);
      }
      messageParser.parse(input);
    }
  };

  const handleValidMessage = () => {
    if (setState) {
      setState((state: any) => ({
        ...state,
        messages: [...state.messages, createChatMessage(input, 'user')]
      }));

      scrollIntoView();
      setInputValue('');
    }
  };

  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  let placeholder = 'Ask a  question...';
  if (placeholderText) {
    placeholder = placeholderText;
  }

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.ChatInnerContainer}>
        {customComponents.header && customComponents.header(actionProvider) ? (
          customComponents.header && customComponents.header(actionProvider)
        ) : (
          <div className={styles.ChatHeader}>{header}</div>
        )}

        <div
          className={styles.ChatMessageContainer}
          ref={messageContainerRef}
        >
          {typeof messageHistory === 'string' && Boolean(messageHistory) && (
            <div
              dangerouslySetInnerHTML={{ __html: messageHistory as string }}
            />
          )}

          {renderMessages()}
          <div style={{ paddingBottom: '15px', backgroundColor: 'red' }} />
        </div>

        <div className={styles.ChatInputContainer}>
          <form
            className={styles.ChatInputForm}
            onSubmit={handleSubmit}
          >
            <input
              className={styles.ChatInput}
              placeholder={placeholder}
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                setInputValue(target.value);
              }}
            />
            <button
              className={styles.ChatBtnSend}
              style={customButtonStyle}
            >
              <AirplaneIcon className={styles.ChatBtnSendIcon} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
