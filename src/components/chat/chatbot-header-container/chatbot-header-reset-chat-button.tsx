import React from 'react';

const BotHeaderResetChatButton = ({}) => (
  <div>
    <button
      type="submit"
      className="inline-flex items-center justify-center p-1 text-sm font-medium transition-all duration-150 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white focus:outline-none active:bg-red-600 active:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
          clipRule="evenodd"
        />
      </svg>
    </button>
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
  </div>
);

export default BotHeaderResetChatButton;
