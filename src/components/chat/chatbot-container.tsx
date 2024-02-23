import { useEffect, useState } from 'preact/hooks';

import {
  botMessage,
  createChatMessage,
  customMessage,
  userMessage
} from 'src/utils/chatbot-message-utils';

import { scrollIntoView } from 'src/actions/scroll-into-view';
import ChatbotInputContainer from 'src/components/chat/chatbot-input-container';
import ChatbotMessageContainer from 'src/components/chat/chatbot-message-retriever';
import * as styles from 'src/styles/chat-widget.css';
import { IChatbotContainerProps } from 'src/types/IChatbotWidget';
import ChatbotHeaderContainer from 'src/components/chat/chatbot-header-container';
import { IChatbotMessage } from 'src/types/IChatbotMessages';
import ChatbotUserMessage from 'src/components/chat/chatbot-user-message';
import ChatbotMessage from 'src/components/chat/chatbot-message-container';

const ChatbotContainer = ({
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
}: IChatbotContainerProps) => {
  const { messages } = state;

  const [input, setInputValue] = useState('');

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView(messageContainerRef);
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

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.ChatInnerContainer}>
        <ChatbotHeaderContainer
          botName={botName}
          headerText={headerText}
          customComponents={customComponents}
          actionProvider={actionProvider}
        />
        {/* <ChatbotMessageRetriever
          widgetRegistry={widgetRegistry}
          customMessages={customMessages}
          actions={actions}
          messages={messages}
          messageHistory={messageHistory}
          messageContainerRef={messageContainerRef}
        /> */}
        <div
          className={styles.ChatMessageContainer}
          ref={messageContainerRef}
        >
          {typeof messageHistory === 'string' && Boolean(messageHistory) ? (
            <div
              dangerouslySetInnerHTML={{ __html: messageHistory as string }}
            />
          ) : null}
          {renderMessages()}
          <div style={{ paddingBottom: '15px' }} />
        </div>
        <ChatbotInputContainer
          setState={setState}
          validator={validator}
          input={input}
          setInputValue={setInputValue}
          parse={parse}
          messageParser={messageParser}
          messageContainerRef={messageContainerRef}
          placeholderText={placeholderText}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default ChatbotContainer;
