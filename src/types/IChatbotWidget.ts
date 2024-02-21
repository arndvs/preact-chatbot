interface IChatbotWidget {
  widgetName: string;
  widgetFunc: (props: any) => preact.VNode;
  props: any;
  mapStateToProps: string[];
}

export default IChatbotWidget;
