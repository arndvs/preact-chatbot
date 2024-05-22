// export const chatApiUrl: string =
//   process.env.CHAT_API_URL ?? 'https://api.rmdevs.com';

export const getChatApiUrl = (env: string | undefined) => {
  return env === null
    ? 'https://api.ripemetrics.com'
    : 'https://api.rmdevs.com';
};
