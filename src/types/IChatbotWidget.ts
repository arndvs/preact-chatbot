import Echo from 'laravel-echo';
import { Ref } from 'preact';
import IChatbotConfig, {
  IChatbotCustomComponents,
  IChatbotCustomMessage,
  IChatbotCustomStyles
} from 'src/types/IChatbotConfig';
import { IChatbotMessage } from 'src/types/IChatbotMessages';

export interface ParentProps {
  [key: string]: any;
}

export interface WidgetProps {
  [key: string]: any;
}
export interface MapStateToProps {
  (props: string[], state: any): WidgetProps;
}
export interface IChatbotWidget {
  widgetName: string;
  widgetFunc: (props: any) => preact.VNode;
  props: any;
  mapStateToProps: MapStateToProps;
}

export interface IChatbotWidgetProps {
  actionProvider: any;
  messageParser: any;
  config: IChatbotConfig;
  headerText?: string;
  isOpen?: boolean;
  saveMessages?: (ref: any) => any;
  setIsOpen: (isOpen: boolean) => void;
  messageHistory?: IChatbotMessage[] | string;
  validator?: (input: string) => Boolean;
  runInitialMessagesWithHistory?: Boolean;
  disableScrollToBottom?: boolean;
}

export interface ChatbotMessageContainerProps {
  messageHistory?: IChatbotMessage[] | string;
  messageContainerRef: Ref<HTMLDivElement> | undefined;
}

export interface IChatbotContainerProps {
  setState?: (state: any) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen?: boolean;
  widgetRegistry: any;
  messageParser: any;
  actionProvider: any;
  customComponents: IChatbotCustomComponents;
  customStyles: IChatbotCustomStyles;
  headerText?: string;
  customMessages: IChatbotCustomMessage;
  validator: ((input: string) => Boolean) | undefined;
  state: any;
  disableScrollToBottom?: boolean;
  messageHistory?: IChatbotMessage[] | string;
  parse?: (message: string) => void;
  actions?: object;
  messageContainerRef: any;
}

export interface ChatbotInputContainerProps {
  setState?: (state: any) => void;
  validator: ((input: string) => Boolean) | undefined;
  input: string;
  setInputValue: any;
  parse?: (message: string) => void;
  messageParser: any;
  messageContainerRef: any;
  customStyles: IChatbotCustomStyles;
}

export interface ChatbotHeaderContainerProps {
  customComponents: IChatbotCustomComponents;
  actionProvider: any;
  headerText?: string;
  setIsOpen: (isOpen: boolean) => void;
}
