import { IChatbotWidget } from 'src/types/IChatbotWidget';
import { IChatbotMessage } from './IChatbotMessages';

interface IChatbotConfig {
  botName?: string;
  initialMessages: IChatbotMessage[];
  state?: any;
  customComponents?: IChatbotCustomComponents;
  customStyles?: IChatbotCustomStyles;
  customMessages?: IChatbotCustomMessage;
  widgets?: IChatbotWidget[];
}

export interface IChatbotCustomComponents {
  header?: (props?: any) => preact.VNode;
  botAvatar?: (props?: any) => preact.VNode;
  botChatMessage?: (props?: any) => preact.VNode;
  userAvatar?: (props?: any) => preact.VNode;
  userChatMessage?: (props?: any) => preact.VNode;
}

export interface IChatbotCustomMessage {
  [index: string]: (props: any) => preact.VNode;
}

export interface IChatbotCustomStyles {
  botMessageBox?: IChatbotBackgroundColor;
  chatButton?: IChatbotBackgroundColor;
}

interface IChatbotBackgroundColor {
  backgroundColor: string;
}

export default IChatbotConfig;
