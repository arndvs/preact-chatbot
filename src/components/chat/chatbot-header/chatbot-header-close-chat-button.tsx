import React from 'react';

const BotHeaderCloseChatButton = ({ brandColor, toggleChat }) => (
  <div>
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1 text-gray-900 shadow-sm transition-all duration-150 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none active:bg-gray-200 active:text-white`}
      onClick={toggleChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </div>
);

export default BotHeaderCloseChatButton;
