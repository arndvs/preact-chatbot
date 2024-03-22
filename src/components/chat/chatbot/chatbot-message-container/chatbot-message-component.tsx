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
  // had to revert to the loading dots and message this 'Hello! How can I assist you today?' would not go away
  return (
    <>
      <div className="flex-1 min-w-0 !ml-1">
        <div className="text-xs">
          <p className="pb-1 text-slate-500 font-xs">{storeName} Bot</p>
        </div>
        <div class="mr-8 flex justify-start">
          <div class="mb-3 max-w-prose overflow-auto rounded-xl rounded-tl-sm px-4 py-3 bg-white text-black shadow-sm">
            <div class="flex flex-col items-start gap-4 break-words">
              <div class="prose w-full break-words text-left text-inherit dark:prose-invert">
                {loading || message === 'Loading ...' ? (
                  <ChatbotLoadingDots />
                ) : (
                  <p>{message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotMessageComponent;
