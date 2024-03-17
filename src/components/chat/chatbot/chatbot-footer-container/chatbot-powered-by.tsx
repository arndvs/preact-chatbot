import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotPoweredBy = () => {
  const { store_id } = useChatbotContext();
  const currentUrl = window.location.href;
  const chatbot_id = store_id;

  const linkWithReferrer = `https://ripemetrics.com?via=widget&amp;utm_source=watermark&amp;chatbot_id=${chatbot_id}&amp;referrer=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <>
      <div className="flex items-center justify-center gap-3 px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-xs font-medium tracking-tight text-gray-400">
            Powered by
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={linkWithReferrer}
          >
            <div className="flex items-center">
              <img
                className="w-auto h-4"
                src="https://ripemetrics.com/favicon/apple-touch-icon-57x57.png"
                alt=""
              />
              <span className="text-xs font-semibold tracking-tight text-gray-900 isomorphic-link isomorphic-link--external hover:text-blue-900 hover:underline">
                RipeMetrics
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ChatbotPoweredBy;
