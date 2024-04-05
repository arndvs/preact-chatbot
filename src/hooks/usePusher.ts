import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';

export const usePusher = (test: boolean) => {
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
          key: test ? 'ba4d144ab20fb212f010' : pusherConfig.key,
          cluster: pusherConfig.cluster,
          forceTLS: true,
          authEndpoint: test
            ? 'https://api.rmdevs.com/api/broadcasting/reputation'
            : pusherConfig.authEndpoint
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
