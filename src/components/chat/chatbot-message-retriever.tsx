import {
  botMessage,
  customMessage,
  userMessage
} from 'src/actions/chatbot-message-utils';
import { showAvatar } from 'src/actions/show-avatar';
import ChatbotMessageContainer from 'src/components/chat/chatbot-message-container/chatbot-message-container';
import ChatbotUserMessageContainer from 'src/components/chat/chatbot-user-message-container';
import {
  IChatbotMessage,
  IChatbotMessageRetrieverProps
} from 'src/types/IChatbotMessages';

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
  setState,
  state,
  widgetRegistry,
  storeLogo
}: IChatbotMessageRetrieverProps) => {
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
          <ChatbotMessageContainer
            customStyles={customStyles.botMessageBox}
            withAvatar={withAvatar}
            {...chatbotMessageProps}
            key={messageObject.id}
            storeLogo={storeLogo}
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
        setState={setState}
        storeLogo={storeLogo}
      />
    );
  };

  return (
    <div
      className="px-7.5 py-4 overflow-y-auto md:h-[40rem] h-[32rem]"
      ref={messageContainerRef}
    >
      {typeof messageHistory === 'string' && Boolean(messageHistory) ? (
        <div dangerouslySetInnerHTML={{ __html: messageHistory as string }} />
      ) : null}
      {renderMessages()}
      <div className="pb-4 bg-red-500" />
    </div>
  );
};

export default ChatbotMessageRetriever;
