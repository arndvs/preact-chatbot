import { IChatbotCustomComponents } from 'src/types/IChatbotConfig';

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

export interface IChatbotMessageContainerProps {
  message: string;
  withAvatar?: boolean;
  loading?: boolean;
  messages: any[];
  delay?: number;
  id: number;
  setState?: any;
  customComponents?: IChatbotCustomComponents;
  customStyles?: { backgroundColor: string };
}

export interface IChatbotUserMessageProps {
  message: string;
  customComponents: IChatbotCustomComponents;
}
