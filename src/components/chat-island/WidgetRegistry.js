import { getObject } from './utils';

class WidgetRegistry {
  constructor(setStateFunc, chatbotActionProvider) {
    this.setState = setStateFunc;
    this.chatbotActionProvider = chatbotActionProvider;
  }

  addWidget = (
    { widgetName, widgetFunc, mapStateToProps, props },
    parentProps
  ) => {
    this[widgetName] = {
      widget: widgetFunc,
      props,
      mapStateToProps,
      parentProps: { ...parentProps }
    };
  };

  getWidget = (widgetName, options) => {
    const widgetObject = this[widgetName];

    if (!widgetObject) return;

    let props = {
      scrollIntoView: options.scrollIntoView,
      ...widgetObject.parentProps,
      ...getObject(widgetObject.props),
      ...this.mapStateToProps(widgetObject.mapStateToProps, options),
      setState: this.setState,
      chatbotActionProvider: this.chatbotActionProvider || options.actions,
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

  mapStateToProps = (props, state) => {
    if (!props) return;

    return props.reduce((acc, prop) => {
      acc[prop] = state[prop];
      return acc;
    }, {});
  };
}

export default WidgetRegistry;
