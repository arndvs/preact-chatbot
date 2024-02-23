export interface MessageContainerRefProps {
  current: HTMLDivElement | null;
}

export const scrollIntoView = (
  messageContainerRef: MessageContainerRefProps
) => {
  setTimeout(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, 50);
};
