import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'preact/hooks';
import { pusherConfig } from 'src/config/pusher';

export const usePusher = () => {
  const [echo, setEcho] = useState<Echo | null>(null);
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
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
          authEndpoint: pusherConfig.authEndpoint
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

  return { echo, pusher };
};
