interface PusherConfig {
  key: string;
  cluster: string;
  authEndpoint: string;
}

export const pusherConfig: PusherConfig = {
  key: process.env.PUSHER_KEY ?? '',
  cluster: process.env.PUSHER_CLUSTER ?? '',
  authEndpoint: process.env.PUSHER_AUTH_ENDPOINT ?? ''
};
