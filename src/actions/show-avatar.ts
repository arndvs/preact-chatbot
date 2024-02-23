export function showAvatar(messages: any[], index: number): boolean {
  if (index === 0) return true;

  const lastMessage = messages[index - 1];

  if (lastMessage.type === 'bot' && !lastMessage.widget) {
    return false;
  }
  return true;
}
