const ChatbotPoweredBy = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-3 px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center gap-1.5">
          <p className="!text-xs font-medium tracking-tight text-gray-400">
            Powered by
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://arndvs.com"
          >
            <span className="!text-xs font-semibold tracking-tight text-gray-900 hover:text-blue-900 hover:underline">
              arndvs
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ChatbotPoweredBy;
