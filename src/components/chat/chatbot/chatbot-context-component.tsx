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
    placeholderText,
    profilePicture,
    displayName,
    userMessageBackgroundColor,
    chatIcon,
    chatBubbleButtonColor,
    chatHeadingColor,
    chatHeadingFontColor,
    botGreeting,
    userMessageFontColor,
    chatBubbleButtonIconColor
  } = useChatbotContext();

  return (
    <>
      <div className="max-w-2xl p-4 mx-auto space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div className="max-w-2xl ">
          <h2 className="!text-base font-semibold leading-7 text-gray-900">
            Chatbot Context
          </h2>
          <p className="mt-1 !text-sm leading-6 text-gray-500">
            This information is currently available in the chatbot context.
          </p>

          <div className="flex justify-center mx-auto ">
            <dl className="mt-6 space-y-6 !text-sm leading-6 border-t border-gray-200 divide-y divide-gray-100 ">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Store Name
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">storeName</div>
                  <div className="text-gray-900">{storeName}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Display Name
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">displayName</div>
                  <div className="text-gray-900">{displayName}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Store Logo
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">storeLogo</div>
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
                  Profile Picture
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">profilePicture</div>
                  <div className="text-gray-900">
                    {profilePicture && (
                      <img
                        className="w-20 h-20"
                        src={profilePicture}
                        alt="Profile Picture"
                      />
                    )}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Brand Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">brandColor</div>
                  <div className="text-gray-900">{brandColor}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Chat Heading Background Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">chatHeadingColor</div>
                  <div className="text-gray-900">{chatHeadingColor}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Chat Heading Font Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">chatHeadingFontColor</div>
                  <div className="text-gray-900">{chatHeadingFontColor}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Bot Greeting
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">botGreeting</div>
                  <div className="text-gray-900">{botGreeting}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  User Message Background Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">
                    userMessageBackgroundColor
                  </div>
                  <div className="text-gray-900">
                    {userMessageBackgroundColor}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  User Message Font Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">userMessageFontColor</div>
                  <div className="text-gray-900">{userMessageFontColor}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Placeholder Text
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">placeholderText</div>
                  <div className="text-gray-900">{placeholderText}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Chat Bubble Button Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">chatBubbleButtonColor</div>
                  <div className="text-gray-900">{chatBubbleButtonColor}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Chat Bubble Button Icon Color
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">chatBubbleButtonIconColor</div>
                  <div className="text-gray-900">
                    {chatBubbleButtonIconColor}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Chat Icon
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">chatIcon</div>
                  <div className="text-gray-900">
                    {chatIcon && (
                      <img
                        className="w-20 h-20"
                        src={chatIcon}
                        alt="Profile Picture"
                      />
                    )}
                  </div>
                </dd>
              </div>

              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Session ID
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">session_id</div>
                  <div className="text-gray-900">{session_id}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Store ID
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">store_id</div>
                  <div className="text-gray-900">{store_id}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Initial Messages
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">initial messages</div>
                  <div className="text-gray-900">initial messages</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Messages
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">messages</div>
                  <div className="text-gray-900">{messages}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Domain
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">domain</div>
                  <div className="text-gray-900">{domain}</div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Customer Store ID
                </dt>
                <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">customer_store_id</div>
                  <div className="text-gray-900">{customer_store_id}</div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotContextComponent;
