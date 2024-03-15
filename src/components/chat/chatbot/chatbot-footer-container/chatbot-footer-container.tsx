import { useState } from 'preact/hooks';
import ChatbotInputContainer from 'src/components/chat/chatbot/chatbot-input-container';
import ChatbotPoweredBy from 'src/components/chat/chatbot/chatbot-powered-by';

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
    <div className="">
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
