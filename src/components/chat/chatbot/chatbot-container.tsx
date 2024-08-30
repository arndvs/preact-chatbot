import { useEffect } from 'preact/hooks';

import { scrollIntoView } from 'src/actions/chatbot/scroll-into-view';
import ChatbotFooterContainer from 'src/components/chat/chatbot/chatbot-footer-container/chatbot-footer-container';
import ChatbotHeaderContainer from 'src/components/chat/chatbot/chatbot-header-container/chatbot-header-container';
import ChatbotMessageRetriever from 'src/components/chat/chatbot/chatbot-message-container/chatbot-message-retriever';

import { IChatbotContainerProps } from 'src/types/IChatbotWidget';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import useClassNames from 'src/hooks/useClassNames';

const ChatbotContainer = ({
  actionProvider,
  actions,
  customComponents,
  customMessages,
  customStyles,
  disableScrollToBottom,
  headerText,
  messageContainerRef,
  messageHistory,
  messageParser,
  parse,
  setIsOpen,
  validator,
  widgetRegistry,
  completed
}: IChatbotContainerProps) => {
  const { messages, islandType } = useChatbotContext();

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView(messageContainerRef);
  });

  return (
    <>
      <div
        className={useClassNames(
          islandType === 'panel'
            ? 'h-screen sm:max-h-[60dvh]'
            : 'h-screen sm:max-h-[86dvh]'
        )}
        title="Chatbot"
      >
        <div className="flex flex-col flex-auto h-full overflow-hidden bg-gray-50 shrink-0 group cb-light">
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
            widgetRegistry={widgetRegistry}
          />
          <ChatbotFooterContainer
            customStyles={customStyles}
            messageContainerRef={messageContainerRef}
            messageParser={messageParser}
            parse={parse}
            validator={validator}
          />
        </div>
      </div>
    </>
  );
};

export default ChatbotContainer;
