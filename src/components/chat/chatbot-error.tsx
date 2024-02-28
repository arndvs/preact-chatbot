import React from 'react';

import ChatbotMessage from './chatbot-message-container/chatbot-message-container';

interface IChatbotErrorProps {
  message: string;
  storeLogo: string;
}

const ChatbotError = ({ message, storeLogo }: IChatbotErrorProps) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <h1 className="mb-8 text-lg text-gray-900">
        Ooops. Something is missing.
      </h1>
      <div className="w-full">
        <ChatbotMessage
          message={message}
          withAvatar
          loading={false}
          id={1}
          customStyles={{ backgroundColor: '' }}
          messages={[]}
          storeLogo={storeLogo}
        />
      </div>
      <a
        href="https://fredrikoseberg.github.io/react-chatbot-kit-docs/"
        rel="noopener norefferer"
        target="_blank"
        className="block w-32 px-2 py-1 mx-auto text-base text-center text-blue-600 no-underline border border-blue-400"
      >
        View the docs
      </a>
    </div>
  );
};

export default ChatbotError;
