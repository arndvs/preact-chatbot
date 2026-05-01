import Pusher from 'pusher-js';
import { useEffect } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';
import { getChatApiUrl } from '../config/chat-api-url';
import { useChatbotContext } from './useChatbotContext';

export const usePusher = () => {
  const { env } = useChatbotContext();
  const chatApiUrl = getChatApiUrl(env);
  useEffect(() => {
    try {
      if (!(window as any).Pusher) {
        (window as any).Pusher = Pusher;
      }
      if (!(window as any).__pusherClient) {
        (window as any).__pusherClient = new Pusher(pusherConfig.key, {
          cluster: pusherConfig.cluster,
          forceTLS: true,
          authEndpoint: `${chatApiUrl}/api/broadcasting/reputation`
        });
      }
    } catch (error) {
      console.error('Error creating Pusher client:', error);
    }
  }, []);
};
