import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';

export const usePusher = () => {
  useEffect(() => {
    // console.log('Pusher config:', pusherConfig);

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
          authEndpoint: pusherConfig.authEndpoint
        });

        console.log('Pusher client created');
        // console.log('New Echo', window.Echo);
        // console.log('Pusher client created');
      } else {
        console.log('Pusher client already exists');
      }
    } catch (error) {
      console.error('Error creating Pusher client:', error);
    }
  }, []);

  // return { echo, pusher };
};
