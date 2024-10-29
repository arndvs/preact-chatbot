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
  const { userMessageBackgroundColor, userMessageFontColor, brandColor } =
    useChatbotContext();

  // Determine the background color based on conditions
  const backgroundColor =
    userMessageBackgroundColor != null && userMessageFontColor !== ''
      ? userMessageBackgroundColor
      : brandColor ?? '#e5e5e5';

  if (customComponents?.userChatMessage) {
    return callIfExists(customComponents.userChatMessage, { message });
  } else {
    return (
      <>
        <div>
          <div className="flex flex-col space-y-1.5 px-3 items-end">
            <div className="flex items-center gap-1.5 justify-end">
              <div class="!text-xs">
                <p class="pb-1 text-slate-500 ">You</p>
              </div>
            </div>
            <div
              className="inline-flex flex-col gap-2 px-3 py-3 !text-base font-normal rounded-tr-sm shadow-sm rounded-xl"
              style={{
                backgroundColor: backgroundColor
              }}
            >
              <p style={{ color: userMessageFontColor }}>{message}</p>
            </div>

            {/* <span className="block !text-xs font-normal text-right text-gray-500">
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
