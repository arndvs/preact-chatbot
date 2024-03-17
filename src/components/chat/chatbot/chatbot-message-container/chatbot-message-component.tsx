import ChatbotLoadingDots from 'src/components/chat/chatbot/chatbot-message-container/chatbot-loading-dots';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotMessageComponentProps {
  message: string;
  loading: boolean | undefined;
}

const ChatbotMessageComponent = ({
  message,
  loading
}: ChatbotMessageComponentProps) => {
  const { storeName } = useChatbotContext();

  return (
    <>
      <div className="flex-1 min-w-0 !ml-1">
        <div className="text-xs">
          <p className="pb-1 text-slate-500 font-xs">{storeName} Bot</p>
        </div>
        <div className="flex justify-start mr-8">
          <div class="mb-3 max-w-prose overflow-auto rounded-xl rounded-tl-sm px-4 py-3 bg-white text-gray-900 shadow-sm">
            <div className="flex flex-col items-start gap-4 break-words">
              <div className="w-full prose text-left break-words text-inherit dark:prose-invert">
                <p>Hello! How can I assist you today?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotMessageComponent;
