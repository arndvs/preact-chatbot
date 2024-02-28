import React from 'react';
import ChatbotLoadingDots from 'src/components/chat/chatbot-loading-dots';

interface ChatbotMessageComponentProps {
  message: string;
  loading: boolean | undefined;
}

const ChatbotMessageComponent = ({
  message,
  loading
}: ChatbotMessageComponentProps) => {
  return (
    <div className="flex-1 min-w-0 !ml-1">
      <div>
        <div className="text-xs">
          <p className="pb-2 text-slate-500 font-xs">RipeMetrics Bot</p>
        </div>
      </div>
      <div class="mr-8 flex justify-start">
        <div class="mb-3 max-w-prose overflow-auto rounded-lg px-4 py-3 bg-[#f1f1f0]  text-black">
          <div class="flex flex-col items-start gap-4 break-words">
            <div class="prose w-full break-words text-left text-inherit dark:prose-invert">
              {loading ? <ChatbotLoadingDots /> : <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessageComponent;
