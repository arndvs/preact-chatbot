import ChatbotMessage from './chatbot-message-container/chatbot-message-container';

interface IChatbotErrorProps {
  message: string;
}

const ChatbotError = ({ message }: IChatbotErrorProps) => {
  const currentUrl = window.location.href;

  const linkWithReferrer = `https://ripemetrics.com/contact?via=widget&amp;utm_source=watermark&amp;referrer=${encodeURIComponent(
    currentUrl
  )}`;

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
        />
      </div>
      <a
        href={linkWithReferrer}
        rel="noopener norefferer"
        target="_blank"
        className="block w-32 px-2 py-1 mx-auto text-base text-center text-blue-600 no-underline border border-blue-400"
      >
        Contact RipeMetrics Customer Support
      </a>
    </div>
  );
};

export default ChatbotError;
