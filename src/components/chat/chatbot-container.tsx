import { useEffect, useState } from 'preact/hooks';

import { scrollIntoView } from 'src/actions/scroll-into-view';
import ChatbotHeaderContainer from 'src/components/chat/chatbot-header-container';
import ChatbotInputContainer from 'src/components/chat/chatbot-input-container';
import ChatbotMessageRetriever from 'src/components/chat/chatbot-message-retriever';
import { IChatbotContainerProps } from 'src/types/IChatbotWidget';

const ChatbotContainer = ({
  actionProvider,
  actions,
  botName,
  customComponents,
  customMessages,
  customStyles,
  disableScrollToBottom,
  headerText,
  messageContainerRef,
  messageHistory,
  messageParser,
  parse,
  placeholderText,
  setState,
  state,
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
      <div className="h-full max-h-full overflow-hidden bg-white rounded-lg shadow-md">
        <ChatbotHeaderContainer
          actionProvider={actionProvider}
          botName={botName}
          customComponents={customComponents}
          headerText={headerText}
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
        />
      </div>
    </div>
  );
};

export default ChatbotContainer;
