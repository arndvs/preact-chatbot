import { MessageContainerRefProps } from 'src/actions/chatbot/scroll-into-view';
import {
  IChatbotCustomComponents,
  IChatbotCustomMessage,
  IChatbotCustomStyles
} from 'src/types/IChatbotConfig';

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

export interface IChatbotUserMessageContainerProps {
  message: string;
  customComponents: IChatbotCustomComponents;
}

export interface IChatbotMessageRetrieverProps {
  actionProvider: any;
  actions?: object;
  customComponents: IChatbotCustomComponents;
  customMessages: IChatbotCustomMessage;
  customStyles: IChatbotCustomStyles;
  messageContainerRef: MessageContainerRefProps;
  messageHistory?: IChatbotMessage[] | string;
  messages: any[];
  scrollIntoView: (messageContainerRef: MessageContainerRefProps) => void;
  setState?: any;
  state: any;
  widgetRegistry: any;
}
