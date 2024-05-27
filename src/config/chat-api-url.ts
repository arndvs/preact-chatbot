export const getChatApiUrl = (env: string | null) => {
  return 'https://api.ripemetrics.com';
  // return env === null
  //   ? 'https://api.ripemetrics.com'
  //   : 'https://api.rmdevs.com';
};
