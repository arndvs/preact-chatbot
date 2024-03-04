import ChatbotContainer from 'src/components/chat/chatbot/chatbot-container';
import useChatbot from 'src/hooks/useChatbot';
import { IChatbotWidgetProps } from 'src/types/IChatbotWidget';
import {
  getBotName,
  getCustomComponents,
  getCustomMessages,
  getCustomStyles,
  isConstructor
} from 'src/actions/chatbot/chatbot-config-utils';
import { createChatBotMessage } from 'src/actions/chatbot/chatbot-message-utils';
import ChatbotError from './chatbot-error';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'preact/hooks';
import config from '../../../playwright.config';

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  isOpen,
  saveMessages,
  setIsOpen,
  messageHistory,
  runInitialMessagesWithHistory,
  disableScrollToBottom,
  validator,
  ...rest
}: IChatbotWidgetProps) => {
  const {
    configurationError,
    invalidPropsError,
    ActionProvider,
    MessageParser,
    widgetRegistry,
    messageContainerRef,
    actionProv,
    messagePars,
    state,
    setState
  } = useChatbot({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    saveMessages,
    runInitialMessagesWithHistory,
    ...rest
  });
  const [echo, setEcho] = useState<Echo | null>(null);
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    const pusherConfig = {
      key: 'ba4d144ab20fb212f010',
      cluster: 'us3'
    };
    // console.log('Pusher config:', pusherConfig);

    Pusher.logToConsole = true;
    // console.log('Pusher key:');
    // if (!token) return;
    try {
      setPusher(
        new Pusher(pusherConfig.key, { cluster: pusherConfig.cluster })
      );
      if (!echo || echo === undefined) {
        const newEcho = new Echo({
          broadcaster: 'pusher',
          key: pusherConfig.key,
          cluster: pusherConfig.cluster,
          forceTLS: true,
          authEndpoint: `https://api.rmdevs.com/api/broadcasting/reputation`
        });
        setEcho(newEcho);
        console.log('Pusher client created');
        console.log('New Echo', newEcho);
        // console.log('New Echo', window.Echo);
        // console.log('Pusher client created');
      } else {
        console.log('Pusher client already exists');
      }
    } catch (error) {
      console.error('Error creating Pusher client:', error);
    }

    const subscription = `chat-stream-12-`;
    // console.log('user channel ID', subscription);

    if (
      echo !== undefined &&
      echo !== null
      // userChannels.length > 0
    ) {
      // console.log('user channel is in if:', subscription);
      // echo.private(subscription).listenToAll((e, data) => {
      //   console.log('chatbot response:', e);
      //   // console.log('text:', data.text);
      //   if (data?.completed === false) {
      //     setAiUserTestResponse((prevResponse) => prevResponse + data.text);
      //   }
      // });
    }

    return () => {
      // Clean up subscription that is not an array
      // subscription.unsubscribe();
    };
  }, []);

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError?.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);

  const chatbotContainerProps = {
    state,
    setState,
    widgetRegistry,
    actionProvider: isConstructor(ActionProvider) ? actionProv : ActionProvider,
    messageParser: isConstructor(MessageParser) ? messagePars : MessageParser,
    customMessages,
    customComponents,
    botName,
    isOpen,
    setIsOpen,
    customStyles,
    headerText,
    validator,
    messageHistory,
    disableScrollToBottom,
    messageContainerRef
  };

  if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
    return <ChatbotContainer {...chatbotContainerProps} />;
  } else {
    return (
      <ActionProvider
        state={state}
        setState={setState}
        createChatBotMessage={createChatBotMessage}
      >
        <MessageParser>
          <ChatbotContainer {...chatbotContainerProps} />
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default Chatbot;
