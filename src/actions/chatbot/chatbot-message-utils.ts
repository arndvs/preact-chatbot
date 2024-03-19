import {
  IChatbotMessage,
  IChatbotMessageOptions
} from 'src/types/IChatbotMessages';

export const uniqueId = () => {
  return Math.round(Date.now() * Math.random());
};

export const botMessage = (message: IChatbotMessage) => {
  if (message.type === 'bot') {
    return true;
  }
  return false;
};

export const userMessage = (message: IChatbotMessage) => {
  if (message.type === 'user') {
    return true;
  }
  return false;
};

export const customMessage = (
  message: IChatbotMessage,
  customMessages: any
) => {
  const customMessage = customMessages[message.type];

  if (customMessage) {
    return true;
  }
  return false;
};

export const createChatMessage = (message: string, type: string) => {
  return {
    message: message,
    type: type,
    id: uniqueId()
  };
};

export const createChatBotMessage = (
  message: string,
  options?: IChatbotMessageOptions
): IChatbotMessage => {
  return {
    ...createChatMessage(message, 'bot'),
    ...options
    // loading is in the options object
    // loading: options?.loading ?? true
  };
};

export const createCustomMessage = (
  message: string,
  type: string,
  options: IChatbotMessageOptions
) => {
  return { ...createChatMessage(message, type), ...options };
};

export const createClientMessage = (
  message: string,
  options: IChatbotMessageOptions
) => {
  return { ...createChatMessage(message, 'user'), ...options };
};

export const callIfExists = (func: any, ...args: any) => {
  if (func) {
    return func(...args);
  }
};
