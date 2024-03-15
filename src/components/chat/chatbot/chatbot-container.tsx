import { useEffect, useState } from 'preact/hooks';

import { scrollIntoView } from 'src/actions/chatbot/scroll-into-view';
import ChatbotFooterContainer from 'src/components/chat/chatbot/chatbot-footer-container/chatbot-footer-container';
import ChatbotHeaderContainer from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-container';

import ChatbotInputContainer from 'src/components/chat/chatbot/chatbot-input-container';
import ChatbotMessageRetriever from 'src/components/chat/chatbot/chatbot-message-retriever';
import ChatbotPoweredBy from 'src/components/chat/chatbot/chatbot-powered-by';

import { IChatbotContainerProps } from 'src/types/IChatbotWidget';

const ChatbotContainer = ({
  actionProvider,
  actions,
  customComponents,
  customMessages,
  customStyles,
  disableScrollToBottom,
  headerText,
  isOpen,
  messageContainerRef,
  messageHistory,
  messageParser,
  parse,
  setState,
  setIsOpen,
  state,
  validator,
  widgetRegistry
}: IChatbotContainerProps) => {
  const { messages } = state;

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView(messageContainerRef);
  });

  return (
    <>
      <div className="relative w-full">
        <div className="h-full bg-[#f1f3f7] rounded-md">
          <ChatbotHeaderContainer
            actionProvider={actionProvider}
            customComponents={customComponents}
            headerText={headerText}
            setIsOpen={setIsOpen}
          />
          <ChatbotMessageRetriever
            actionProvider={actionProvider}
            actions={actions}
            customComponents={customComponents}
            customMessages={customMessages}
            customStyles={customStyles}
            messageContainerRef={messageContainerRef}
            messageHistory={messageHistory}
            messages={messages}
            scrollIntoView={scrollIntoView}
            setState={setState}
            state={state}
            widgetRegistry={widgetRegistry}
          />
          <ChatbotFooterContainer
            customStyles={customStyles}
            messageContainerRef={messageContainerRef}
            messageParser={messageParser}
            parse={parse}
            setState={setState}
            validator={validator}
          />
        </div>
      </div>
    </>
  );
};

export default ChatbotContainer;
