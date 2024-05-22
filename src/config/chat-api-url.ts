export const getChatApiUrl = (env: string | null) => {
  return env === null
    ? 'https://api.ripemetrics.com'
    : 'https://api.rmdevs.com';
};
