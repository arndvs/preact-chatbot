export const getChatApiUrl = (env: string | null) => {
  return process.env.CHAT_API_URL;
  // return env === null
  //   ? 'https://api.ripemetrics.com'
  //   : 'https://api.rmdevs.com';
};
