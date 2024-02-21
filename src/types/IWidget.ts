

interface IWidget {
  widgetName: string;
  widgetFunc: (props: any) => preact.VNode;
  props: any;
  mapStateToProps: string[];
}

export default IWidget;
