import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';
import { callIfExists } from 'src/actions/chatbot/chatbot-message-utils';
import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotUserMessageProps {
  customComponents?: IChatbotCustomComponents;
  message: string;
}

const ChatbotUserMessage = ({
  customComponents,
  message
}: ChatbotUserMessageProps) => {
  const { brandColor } = useChatbotContext();

  if (customComponents?.userChatMessage) {
    return callIfExists(customComponents.userChatMessage, { message });
  } else {
    return (
      <>
        {/* <div className="relative p-2 text-sm font-medium text-left text-gray-700 bg-gray-200 rounded-md">
          {message}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-b-8 border-l-8 border-gray-200"></div>
        </div> */}
        <div>
          <div className="flex flex-col space-y-1.5 px-4 items-end">
            <div className="flex items-center gap-1.5 justify-end">
              <div class="text-xs">
                <p class="pb-1 text-slate-500 font-xs">You</p>
              </div>
            </div>
            <div
              className="inline-flex flex-col gap-2 px-4 py-3 font-normal text-white rounded-tr-sm rounded-xl"
              style={{ backgroundColor: brandColor }}
            >
              {message}
            </div>

            {/* <span className="block text-xs font-normal text-right text-gray-500">
              <time
                datetime="2024-02-28T20:49:08.445Z"
                title="Wednesday, February 28, 2024 at 12:49:08 PM"
              >
                32 minutes ago
              </time>
            </span> */}
          </div>
        </div>
      </>
    );
  }
};

export default ChatbotUserMessage;
