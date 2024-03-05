import { getObject } from 'src/actions/chatbot/chatbot-config-utils';

interface WidgetProps {
  [key: string]: any;
}

type MapStateToProps = (props: string[], state: any) => WidgetProps;

interface ParentProps {
  [key: string]: any;
}

class ChatbotWidgetRegistry {
  setState: Function;
  actionProvider: any;
  [key: string]: any; // Index signature

  constructor(setStateFunc: Function, actionProvider: any) {
    this.setState = setStateFunc;
    this.actionProvider = actionProvider;
  }

  addWidget = (
    {
      widgetName,
      widgetFunc,
      mapStateToProps,
      props
    }: {
      widgetName: string;
      widgetFunc: Function;
      mapStateToProps: MapStateToProps;
      props: WidgetProps;
    },
    parentProps: ParentProps
  ) => {
    this[widgetName] = {
      widget: widgetFunc,
      props,
      mapStateToProps,
      parentProps: { ...parentProps }
    };
  };

  getWidget = (widgetName: string, options: any) => {
    const widgetObject = this[widgetName];

    if (!widgetObject) return;

    let props: WidgetProps = {
      scrollIntoView: options.scrollIntoView,
      ...widgetObject.parentProps,
      ...getObject(widgetObject.props),
      ...this.mapStateToProps(widgetObject.mapStateToProps, options),
      setState: this.setState,
      actionProvider: this.actionProvider || options.actions,
      actions: options.actions,
      state: options,
      payload: options.payload
    };

    const widget = widgetObject.widget(props);

    if (widget) {
      return widget;
    }

    return null;
  };

  mapStateToProps: MapStateToProps = (props, state) => {
    if (!props) return {};

    return props.reduce((acc: WidgetProps, prop: string) => {
      acc[prop] = state[prop];
      return acc;
    }, {});
  };
}

export default ChatbotWidgetRegistry;
