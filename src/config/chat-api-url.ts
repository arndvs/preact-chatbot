export const getChatApiUrl = (env: string | null) => {
  const url = process.env.CHAT_API_URL;
  if (!url) {
    throw new Error('CHAT_API_URL environment variable is required');
  }
  return url;
};
