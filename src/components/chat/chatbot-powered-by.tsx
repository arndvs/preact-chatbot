const ChatbotPoweredBy = () => {
  const currentUrl = window.location.href;

  const linkWithReferrer = `https://ripemetrics.com?referrer=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="flex justify-center w-full p-2">
      <p class="mt-6 text-xs text-gray-500 md:mt-0">Chat⚡by&nbsp;</p>
      <a
        href={linkWithReferrer}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p class="mt-6 text-xs text-gray-500 md:mt-0 font-bold">RipeMetrics</p>
      </a>
    </div>
  );
};

export default ChatbotPoweredBy;
