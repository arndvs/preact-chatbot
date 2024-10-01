import { WebComponentPortal } from 'preact-island';
import { FC } from 'preact/compat';
import { Box } from 'src/components/ui';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import useClassNames from 'src/hooks/useClassNames';
import { useChatbotConfig } from 'src/hooks/useChatbotConfig';
import ChatbotPoweredBy from 'src/components/chat/chatbot/chatbot-footer-container/chatbot-powered-by';
import MarketingBotMessage from 'src/components/internal-components/marketing-chatbot/marketing-bot-message';
import MarketingUserMessage from 'src/components/internal-components/marketing-chatbot/marketing-user-message';
import MarketingHeader from 'src/components/internal-components/marketing-chatbot/marketing-header';

interface MarketingModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  islandName: string;
}

const ChatOverlay: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent
}) => {
  useWebComponentEvents(name, parent);

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>;
};

const MarketingModal = ({
  isOpen,
  setIsOpen,
  islandName
}: MarketingModalProps) => {
  const chatbotConfig = useChatbotConfig();

  return (
    <>
      {isOpen && (
        <ChatOverlay
          name="chat-overlay"
          parent={islandName}
        >
          {/* chatbot Box */}
          <Box
            data-testId="overlay-content"
            className={useClassNames(
              'z-[9999999999] border-none fixed flex flex-col justify-between shadow-custom rounded-lg overflow-hidden bg-white',
              'lg:w-[28rem] lg:max-h-[86vh] lg:bottom-20 lg:right-4', // Large screens
              'md:w-[28rem] md:max-h-[86vh] md:bottom-20 md:right-4', // Medium screens
              'sm:w-[28rem] sm:max-h-[86vh] sm:bottom-20 sm:right-4', // Small screens
              'xs:w-full xs:h-full xs:bottom-0 xs:right-0', // Extra small screens (mobile)
              'max-w-full max-h-full bottom-0 right-0' // Extra small screens (mobile)
            )}
          >
            {/* chatbot panel */}
            <div
              className="h-screen sm:max-h-[86dvh]"
              title="Chatbot"
            >
              <div className="flex flex-col h-full overflow-hidden bg-white shrink-0 group cb-light">
                <MarketingHeader />

                {/* chatbot message container */}
                <div className="flex-grow overflow-y-auto">
                  <div className="h-full react-scroll-to-bottom--css-xzqzq-79elbk">
                    <div className="react-scroll-to-bottom--css-xzqzq-1n7m0yu">
                      <div
                        className="px-3 pt-4"
                        tabIndex={0}
                      >
                        <div>
                          {/* <MarketingUserMessage userMessage="I'm interested in joining your fitness classes, but I'm not sure which one would be the best fit for me. Can you help?" />
                          <MarketingBotMessage botMessage="Absolutely! We offer a variety of fitness classes tailored to different preferences and fitness levels. To find the best class for you, please let us know your fitness goals, any previous experience with specific workouts, and any physical limitations you may have. With this information, we can recommend the perfect class to help you reach your goals and enjoy your fitness journey." /> */}
                          <MarketingUserMessage userMessage="I'm thinking about getting a membership. What's your cancellation policy." />
                          <MarketingBotMessage botMessage="Of course! We totally get that life can throw curveballs, so we've got flexible membership options. You can cancel with 14 days' notice before the next billing cycle. Plus, we offer temporary freezes if things come up. If you need more details or have any questions, just let me know!" />
                          <MarketingUserMessage userMessage="Perfect! I'm interested in joining. What are the next steps?" />
                          <MarketingBotMessage botMessage="First, let's get your email and we'll get back to you shortly." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* / chatbot message container */}
                {/* chatbot footer */}
                <div className=" bg-inherit">
                  <div className="flex gap-2 px-3 pt-3 overflow-x-auto "></div>
                  <div className="flex border-t p-4 py-2 group-[.cb-dark]:border-[#3f3f46] group-[.cb-light]:border-[#e4e4e7]">
                    <div className="flex items-center w-full leading-none">
                      <textarea
                        required
                        maxLength={4000}
                        rows={1}
                        tabIndex={0}
                        style="height:24px"
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
                        aria-label="Send Message"
                        title="Send Message"
                        disabled={false}
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
                  <ChatbotPoweredBy />
                </div>
                {/* / chatbot footer */}
              </div>
            </div>
            {/* / chatbot panel */}
          </Box>
          {/* / chatbot Box */}
        </ChatOverlay>
      )}
      {isOpen && (
        <ChatOverlay
          name="chat-overylay-dimmer"
          parent={islandName}
        >
          <Box
            data-testId="overlay-dimmer"
            className={useClassNames(
              'fixed hidden z-[90] top-0 left-0 right-0 bottom-0',
              isOpen && 'hidden sm:block'
            )}
            onClick={() => setIsOpen(false)}
          />
        </ChatOverlay>
      )}
    </>
  );
};

export default MarketingModal;
