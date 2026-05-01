/// <reference types="preact" />

declare var process: {
  env: {
    CHAT_API_URL?: string;
    PUSHER_KEY?: string;
    PUSHER_CLUSTER?: string;
    PUSHER_AUTH_ENDPOINT?: string;
    NODE_ENV?: string;
  };
};
