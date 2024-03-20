interface ChatApiUrl {
  chatApiUrl: string;
}

export const chatApiUrl: ChatApiUrl = {
  chatApiUrl: process.env.CHAT_API_URL ?? 'https://api.rmdevs.com'
};
