import FlameLogoIcon from 'src/assets/flame-logo';

const MarketingHeader = () => {
  return (
    <>
      <div className="w-full px-3 bg-white">
        <div
          className="z-10 flex justify-between py-3"
          aria-label="Chatbot Header"
        >
          <div className="flex items-center">
            <FlameLogoIcon />
            <h1 className="ml-2 !text-lg font-semibold text-zinc-900">
              Ignite Fitness
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-0 py-3 !text-sm transition-transform duration-700 ease-in-out hover:rotate-180 hover:bg-inherit group-[.cb-dark]:text-zinc-300 group-[.cb-dark]:hover:text-zinc-400 group-[.cb-light]:text-zinc-700 group-[.cb-light]:hover:text-zinc-600"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                ></path>
              </svg>
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 ml-3 px-0 py-3 !text-sm hover:bg-inherit group-[.cb-dark]:text-zinc-300 group-[.cb-dark]:hover:text-zinc-400 group-[.cb-light]:text-zinc-700 group-[.cb-light]:hover:text-zinc-600"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
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

export default MarketingHeader;
