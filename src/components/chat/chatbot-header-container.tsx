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
      <div className="w-full px-3">
        <div
          className="z-10 flex justify-between border-b py-1 group-cb-dark:border-#3f3f46 group-cb-light:border-#f1f1f0"
          aria-label="Chatbot Header"
        >
          <div className="flex items-center">
            <span>logo</span>
            <h1 className="text-lg font-bold group-cb-dark:text-zinc-300 group-cb-light:text-zinc-700">
              Chatbase
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="inline-flex items-center justify-center px-0 py-3 text-sm font-medium transition-transform duration-700 ease-in-out rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 hover:rotate-180 hover:bg-inherit group-cb-dark:text-zinc-300 group-cb-dark:hover:text-zinc-400 group-cb-light:text-zinc-700 group-cb-light:hover:text-zinc-600"
              aria-label="Reset Chat"
              title="Reset Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                ></path>
              </svg>
            </button>
            <button
              className="inline-flex items-center justify-center px-0 py-3 ml-3 text-sm font-medium transition-colors rounded-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 hover:bg-inherit group-cb-dark:text-zinc-300 group-cb-dark:hover:text-zinc-400 group-cb-light:text-zinc-700 group-cb-light:hover:text-zinc-600"
              aria-label="Close Chat"
              title="Close Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotHeaderContainer;
