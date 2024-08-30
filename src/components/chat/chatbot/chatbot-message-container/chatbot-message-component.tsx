import { FunctionComponent, useState, useEffect } from 'preact/compat';
import { JSX } from 'preact/jsx-runtime';
import ChatbotLoadingDots from 'src/components/chat/chatbot/chatbot-message-container/chatbot-loading-dots';
import { useChatbotContext } from 'src/hooks/useChatbotContext';
import ReactMarkdown from 'react-markdown';

interface ChatbotMessageComponentProps {
  message: string;
  loading: boolean | undefined;
}

const stripMarkdown = (text: string): string => {
  // Basic stripping of common markdown syntax
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/`(.*?)`/g, '$1') // Inline code
    .replace(/^#+\s/gm, '') // Headers
    .replace(/^[*-]\s/gm, ''); // List items
};

const ChatbotMessageComponent: FunctionComponent<
  ChatbotMessageComponentProps
> = ({ message, loading }) => {
  const { storeName, displayName } = useChatbotContext();
  const [isComplete, setIsComplete] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');

  const botName =
    displayName != null && displayName !== '' ? displayName : storeName;

  useEffect(() => {
    if (!loading && message !== 'Loading ...') {
      setDisplayedMessage(message);
      setIsComplete(true);
    } else {
      setIsComplete(false);
      setDisplayedMessage('');
    }
  }, [loading, message]);

  return (
    <div className="flex-1 min-w-0 !ml-1">
      <div className="text-xs">
        <p className="pb-1 text-slate-500 font-xs">{botName}</p>
      </div>
      <div class="mr-8 flex justify-start">
        <div class="mb-3 max-w-prose overflow-auto rounded-xl rounded-tl-sm px-4 py-3 bg-white text-black shadow-sm">
          <div class="flex flex-col items-start gap-4 break-words">
            <div class="prose w-full break-words text-left text-inherit dark:prose-invert text-base">
              {loading || message === 'Loading ...' ? (
                <ChatbotLoadingDots />
              ) : isComplete ? (
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...(props as JSX.HTMLAttributes<HTMLAnchorElement>)}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noreferrer noopener"
                      />
                    ),
                    img: ({ node, ...props }) => (
                      <img
                        {...(props as JSX.HTMLAttributes<HTMLImageElement>)}
                        className="h-auto w-full max-w-[250px] rounded-md object-contain shadow-sm"
                      />
                    )
                  }}
                >
                  {message ?? 'No Content Provided'}
                </ReactMarkdown>
              ) : (
                <>
                  {console.log('streaming - message', message)}
                  {console.log(
                    'streaming - displayedMessage',
                    displayedMessage
                  )}

                  <div>{stripMarkdown(displayedMessage)}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessageComponent;
