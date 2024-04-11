// export const chatApiUrl: string =
//   process.env.CHAT_API_URL ?? 'https://api.rmdevs.com';

export const getChatApiUrl = (env: string | undefined) => {
  return env === 'dev'
    ? 'https://api.rmdevs.com'
    : 'https://api.ripemetrics.com';
};
