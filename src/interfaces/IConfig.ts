import { IMessage } from './IMessages';
import IWidget from './IWidget';

interface IConfig {
  botName?: string;
  initialMessages: IMessage[];
  state?: any;
  customComponents?: ICustomComponents;
  customStyles?: ICustomStyles;
  customMessages?: ICustomMessage;
  widgets?: IWidget[];
}

export interface ICustomComponents {
  header?: (props?: any) => preact.VNode;
  botAvatar?: (props?: any) => preact.VNode;
  botChatMessage?: (props?: any) => preact.VNode;
  userAvatar?: (props?: any) => preact.VNode;
  userChatMessage?: (props?: any) => preact.VNode;
}

export interface ICustomMessage {
  [index: string]: (props: any) => preact.VNode;
}

export interface ICustomStyles {
  botMessageBox?: IBackgroundColor;
  chatButton?: IBackgroundColor;
}

interface IBackgroundColor {
  backgroundColor: string;
}

export default IConfig;
