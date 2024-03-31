import { useChatbotContext } from 'src/hooks/useChatbotContext';

const ChatbotContextComponent = () => {
  const {
    storeName,
    storeLogo,
    brandColor,
    session_id,
    store_id,
    domain,
    customer_store_id,
    messages,
    chatHeadingColor,
    suggestedMessages,
    placeholderText,
    profilePicture,
    displayName,
    userMessageColor,
    chatIcon,
    chatBubbleButtonColor
  } = useChatbotContext();

  return (
    <>
      <div className="max-w-2xl p-4 mx-auto space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div className="">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Chatbot Context
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information is currently available in the chatbot context.
          </p>

          <dl className="mt-6 space-y-6 text-sm leading-6 border-t border-gray-200 divide-y divide-gray-100">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Store Name
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{storeName}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Store Logo
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  <img
                    className="w-20 h-20"
                    src={storeLogo}
                    alt="Store Logo"
                  />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Brand Color
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{brandColor}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Placeholder Text
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{placeholderText}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Session ID
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{session_id}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Store ID
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{store_id}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Messages
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{messages}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Domain
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{domain}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Customer Store ID
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{customer_store_id}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Chat Heading Color
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{chatHeadingColor}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Suggested Messages
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {suggestedMessages.join(', ')}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Profile Picture
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  <img
                    className="w-20 h-20"
                    src={profilePicture}
                    alt="Profile Picture"
                  />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Display Name
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{displayName}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                User Message Color
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{userMessageColor}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Chat Icon
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  <img
                    className="w-20 h-20"
                    src={chatIcon}
                    alt="Profile Picture"
                  />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Chat Bubble Button Color
              </dt>
              <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{chatBubbleButtonColor}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ChatbotContextComponent;
