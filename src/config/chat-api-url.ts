export const getChatApiUrl = (env: string | null) => {
  return env === null ? process.env.CHAT_API_URL : 'https://api.rmdevs.com';
};
