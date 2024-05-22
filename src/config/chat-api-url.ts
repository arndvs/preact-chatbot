export const getChatApiUrl = (env: string | undefined) => {
  return env === null
    ? 'https://api.ripemetrics.com'
    : 'https://api.rmdevs.com';
};
