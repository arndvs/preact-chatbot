import { useEffect, useState } from 'preact/hooks';

import { scrollIntoView } from 'src/actions/scroll-into-view';
import ChatbotHeaderContainer from 'src/components/chat/chatbot-header-container/chatbot-header-container';

import ChatbotInputContainer from 'src/components/chat/chatbot-input-container';
import ChatbotMessageRetriever from 'src/components/chat/chatbot-message-retriever';
import ChatbotPoweredBy from 'src/components/chat/chatbot-powered-by';

import { IChatbotContainerProps } from 'src/types/IChatbotWidget';

const ChatbotContainer = ({
  actionProvider,
  actions,
  botName,
  brandColor,
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
  placeholderText,
  setState,
  setIsOpen,
  state,
  storeName,
  storeLogo,
  validator,
  widgetRegistry
}: IChatbotContainerProps) => {
  const { messages } = state;

  const [input, setInputValue] = useState('');

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView(messageContainerRef);
  });

  return (
    <div className="relative w-full">
      <div className="h-full bg-white rounded-md">
        <ChatbotHeaderContainer
          actionProvider={actionProvider}
          botName={botName}
          brandColor={brandColor}
          customComponents={customComponents}
          headerText={headerText}
          setIsOpen={setIsOpen}
          storeName={storeName}
          storeLogo={storeLogo}
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
          storeLogo={storeLogo}
          brandColor={brandColor}
        />
        <ChatbotInputContainer
          customStyles={customStyles}
          input={input}
          messageContainerRef={messageContainerRef}
          messageParser={messageParser}
          parse={parse}
          placeholderText={placeholderText}
          setState={setState}
          setInputValue={setInputValue}
          validator={validator}
          brandColor={brandColor}
        />
        <ChatbotPoweredBy />
      </div>
    </div>
  );
};

export default ChatbotContainer;
