import React from 'react';
import ChatbotAvatar from 'src/components/chat/chatbot/chatbot-avatar';
import ChatbotLoadingDots from 'src/components/chat/chatbot/chatbot-message-container/chatbot-loading-dots';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

type Props = {};

const ChatbotLoadingMessage = (props: Props) => {
  const { storeName, displayName } = useChatbotContext();

  const botName =
    displayName != null && displayName !== '' ? displayName : storeName;
  return (
    <div
      className="px-3"
      tabIndex={0}
    >
      <div>
        <div className="relative pb-1">
          <ChatbotAvatar className="flex items-center justify-center w-10 h-10 rounded-full shadow-md" />
        </div>

        <div className="flex-1 min-w-0 !ml-1">
          <div className="!text-xs">
            <p className="pb-1 text-slate-500 ">{botName}</p>
          </div>
          <div class="mr-8 flex justify-start">
            <div class="mb-3 max-w-prose overflow-auto rounded-xl rounded-tl-sm px-4 py-3 bg-white text-black shadow-sm">
              <div class="flex flex-col items-start gap-4 break-words">
                <div class="prose w-full break-words text-left text-inherit dark:prose-invert !text-base">
                  <ChatbotLoadingDots />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotLoadingMessage;
