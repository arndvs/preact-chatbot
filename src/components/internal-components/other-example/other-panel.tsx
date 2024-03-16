const OtherPanel = () => {
  return (
    <>
      {/* chatbot */}
      <div
        className="h-screen max-h-[100dvh]"
        title="Chatbot"
      >
        <div className="flex flex-col flex-auto h-full overflow-hidden bg-white shrink-0 group cb-light">
          {/* chatbot header */}
          <div className="w-full px-3">
            <div
              className="z-10 flex justify-between border-b py-1 group-[.cb-dark]:border-[#3f3f46] group-[.cb-light]:border-[#f1f1f0]"
              aria-label="Chatbot Header"
            >
              <div className="flex items-center"></div>
              <div className="flex items-center justify-center">
                {/* reset chat */}
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-0 py-3 text-sm transition-transform duration-700 ease-in-out hover:rotate-180 hover:bg-inherit group-[.cb-dark]:text-zinc-300 group-[.cb-dark]:hover:text-zinc-400 group-[.cb-light]:text-zinc-700 group-[.cb-light]:hover:text-zinc-600"
                  aria-label="Reset Chat"
                  title="Reset Chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
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
                {/* / reset chat */}
                {/* close chat */}
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 ml-3 px-0 py-3 text-sm hover:bg-inherit group-[.cb-dark]:text-zinc-300 group-[.cb-dark]:hover:text-zinc-400 group-[.cb-light]:text-zinc-700 group-[.cb-light]:hover:text-zinc-600"
                  aria-label="Close Chat"
                  title="Close Chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
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
                {/* / close chat */}
              </div>
            </div>
          </div>
          {/* / chatbot header */}
          {/* chatbot message container */}
          <div className="h-full overflow-auto bg-purple-100">
            <div className="h-full bg-green-100 react-scroll-to-bottom--css-qqqda-79elbk">
              <div className="bg-orange-100 react-scroll-to-bottom--css-qqqda-1n7m0yu">
                <div
                  className="px-3 pt-4 bg-blue-100"
                  tabIndex={0}
                >
                  <div>
                    <div className="flex justify-start mr-8 bg-yellow-500">
                      <div className="mb-3 max-w-prose overflow-auto rounded-lg px-4 py-3 group-[.cb-dark]:bg-[#3f3f46] group-[.cb-light]:bg-[#f1f1f0] group-[.cb-dark]:text-white group-[.cb-light]:text-black">
                        <div className="flex flex-col items-start gap-4 break-words">
                          <div className="w-full prose text-left break-words text-inherit dark:prose-invert">
                            <p>Hi! What can I help you with?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* / chatbot message container */}
          {/* chatbot footer */}
          <div className=" bg-inherit">
            <form>
              <div className="flex gap-2 p-3 overflow-x-auto"></div>
              {/* input form */}
              <div className="flex border-t px-4 py-3 group-[.cb-dark]:border-[#3f3f46] group-[.cb-light]:border-[#e4e4e7]">
                <div className="flex items-center w-full leading-none">
                  <textarea
                    required
                    maxLength={4000}
                    rows={1}
                    tabIndex={0}
                    style={{ height: '24px' }}
                    className="mr-3 max-h-36 w-full resize-none bg-transparent pr-3 leading-[24px] focus:outline-none focus:ring-0 focus-visible:ring-0 group-[.cb-dark]:text-white group-[.cb-light]:text-black"
                    placeholder="Message..."
                    aria-label="Write a Message"
                    title="Write a Message"
                  ></textarea>
                </div>
                <div className="flex items-end leading-none">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50 h-9 p-1 group-[.cb-dark]:text-zinc-300 group-[.cb-light]:text-zinc-700"
                    type="submit"
                    disabled
                    aria-label="Send Message"
                    title="Send Message"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              {/* / input form */}
              {/* powered by */}
              <div className="flex items-center justify-center gap-3 px-4 pt-1 pb-3">
                <p className="grow text-nowrap text-center text-xs group-[.cb-dark]:text-[#b4b4b5] group-[.cb-light]:text-[#3f3f46]">
                  Powered By
                  <a
                    target="_blank"
                    className="ml-1 font-semibold group-[.cb-dark]:text-[#f1f1f0] group-[.cb-light]:text-[#141410]"
                    href="/"
                  >
                    hello
                  </a>
                </p>
              </div>
              {/* / powered by */}
            </form>
          </div>
          {/* chatbot footer */}
        </div>
      </div>
      {/* / chatbot */}
    </>
  );
};

export default OtherPanel;
