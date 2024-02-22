export interface IChatbotBaseMessage {
  message: string;
  type: string;
  id: number;
}

export interface IChatbotMessageOptions {
  loading?: boolean;
  widget?: string;
  delay?: number;
  payload?: any;
}

export interface IChatbotMessage extends IChatbotBaseMessage {
  options?: IChatbotMessageOptions;
  loading?: boolean;
  widget?: string;
  delay?: number;
  withAvatar?: boolean;
  payload?: any;
}
