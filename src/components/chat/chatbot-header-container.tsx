import { ChatbotHeaderContainerProps } from 'src/types/IChatbotWidget';

const ChatbotHeaderContainer = ({
  customComponents,
  actionProvider,
  botName,
  headerText
}: ChatbotHeaderContainerProps) => {
  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  return (
    <>
      {customComponents.header && customComponents.header(actionProvider) ? (
        customComponents.header && customComponents.header(actionProvider)
      ) : (
        <div className="p-5 font-bold bg-red-500 border-none rounded-lg cursor-pointer">
          {header}
        </div>
      )}
    </>
  );
};

export default ChatbotHeaderContainer;
