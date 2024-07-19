import React, { useState, useEffect } from 'react';
import {
  botMessage,
  customMessage,
  userMessage
} from 'src/actions/chatbot/chatbot-message-utils';
import { showAvatar } from 'src/actions/chatbot/show-avatar';
import ChatbotMessageContainer from 'src/components/chat/chatbot/chatbot-message-container/chatbot-message-container';
import ChatbotUserMessageContainer from 'src/components/chat/chatbot/chatbot-user-message-container/chatbot-user-message-container';
import ChatbotLoadingDots from 'src/components/chat/chatbot/chatbot-message-container/chatbot-loading-dots';
import {
  IChatbotMessage,
  IChatbotMessageRetrieverProps
} from 'src/types/IChatbotMessages';
import ChatbotLoadingMessage from 'src/components/chat/chatbot/chatbot-message-container/chatbot-loading-message';

const ChatbotMessageRetriever = ({
  actionProvider,
  actions,
  customComponents,
  customMessages,
  customStyles,
  messageContainerRef,
  messageHistory,
  messages,
  scrollIntoView,
  widgetRegistry
}: IChatbotMessageRetrieverProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && userMessage(messages[messages.length - 1])) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [messages]);

  const renderMessages = () => {
    return messages?.map((messageObject: IChatbotMessage, index: number) => {
      if (botMessage(messageObject)) {
        return (
          <div key={messageObject.id}>
            {renderChatbotMessage(messageObject, index)}
          </div>
        );
      }

      if (userMessage(messageObject)) {
        const withAvatar = true;
        return (
          <div key={messageObject.id}>
            {renderUserMessage(messageObject)}
            {loading && <ChatbotLoadingMessage />}
          </div>
        );
      }

      if (customMessage(messageObject, customMessages)) {
        return (
          <div key={messageObject.id}>
            renderCustomMessage{renderCustomMessage(messageObject)}
          </div>
        );
      }
    });
  };

  const renderCustomMessage = (messageObject: IChatbotMessage) => {
    const customMessage = customMessages[messageObject.type];

    const props = {
      scrollIntoView,
      actionProvider,
      payload: messageObject.payload,
      actions
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(messageObject.widget, {
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
      scrollIntoView,
      payload: messageObject.payload,
      actions
    });
    return (
      <>
        <ChatbotUserMessageContainer
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
      customComponents,
      widgetRegistry,
      messages,
      actions
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(chatbotMessageProps.widget, {
        scrollIntoView,
        payload: messageObject.payload,
        actions
      });
      return (
        <>
          <ChatbotMessageContainer
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
      <ChatbotMessageContainer
        customStyles={customStyles.botMessageBox}
        key={messageObject.id}
        withAvatar={withAvatar}
        {...chatbotMessageProps}
        customComponents={customComponents}
        messages={messages}
      />
    );
  };

  return (
    <div
      ref={messageContainerRef}
      className="h-full pt-2 overflow-auto"
    >
      <div className="h-full">
        {typeof messageHistory === 'string' && Boolean(messageHistory) ? (
          <div dangerouslySetInnerHTML={{ __html: messageHistory as string }} />
        ) : null}
        {renderMessages()}
      </div>
    </div>
  );
};

export default ChatbotMessageRetriever;
