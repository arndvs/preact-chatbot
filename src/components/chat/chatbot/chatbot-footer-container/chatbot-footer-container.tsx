import { useState } from 'preact/hooks';
import ChatbotInputContainer from 'src/components/chat/chatbot/chatbot-footer-container/chatbot-input-container';
import ChatbotPoweredBy from 'src/components/chat/chatbot/chatbot-footer-container/chatbot-powered-by';

interface IChatbotFooterContainerProps {
  customStyles: any;
  messageContainerRef: any;
  messageParser: any;
  parse: any;
  setState: any;
  validator: any;
}

const ChatbotFooterContainer = ({
  customStyles,
  messageContainerRef,
  messageParser,
  parse,
  setState,
  validator
}: IChatbotFooterContainerProps) => {
  const [input, setInputValue] = useState('');
  return (
    <div className="bg-inherit">
      <div className="flex gap-2 p-3 overflow-x-auto"></div>
      <ChatbotInputContainer
        customStyles={customStyles}
        input={input}
        messageContainerRef={messageContainerRef}
        messageParser={messageParser}
        parse={parse}
        setState={setState}
        setInputValue={setInputValue}
        validator={validator}
      />
      <ChatbotPoweredBy />
    </div>
  );
};

export default ChatbotFooterContainer;
