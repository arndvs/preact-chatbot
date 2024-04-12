import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';
import { getChatApiUrl } from '../config/chat-api-url';
import { useChatbotContext } from './useChatbotContext';

export const usePusher = () => {
  const { env } = useChatbotContext();
  const chatApiUrl = getChatApiUrl(env);
  useEffect(() => {
    Pusher.logToConsole = true;
    try {
      //@ts-ignore
      window.Pusher = Pusher;
      //@ts-ignore
      if (!window.Echo || window.Echo === undefined) {
        //@ts-ignore
        window.Echo = new Echo({
          broadcaster: 'pusher',
          key: pusherConfig.key,
          cluster: pusherConfig.cluster,
          forceTLS: true,
          authEndpoint: `${chatApiUrl}/api/broadcasting/reputation`
        });
      } else {
        console.log('Pusher client already exists');
      }
    } catch (error) {
      console.error('Error creating Pusher client:', error);
    }
  }, []);

  // return { echo, pusher };
};
