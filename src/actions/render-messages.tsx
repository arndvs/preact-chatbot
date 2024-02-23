// import { showAvatar } from 'src/actions/show-avatar';
// import ChatbotMessage from 'src/components/chat/chatbot-message';
// import ChatbotUserMessage from 'src/components/chat/chatbot-user-message';
// import { IChatbotMessage } from 'src/types/IChatbotMessages';
// import {
//   botMessage,
//   createChatMessage,
//   customMessage,
//   userMessage
// } from 'src/utils/chatbot-message-utils';
// import ChatbotWidgetRegistry from 'src/utils/chatbot-widget-registry';

// export const renderMessages = (messages: any[]) => {
//   return messages.map((messageObject: IChatbotMessage, index: number) => {
//     if (botMessage(messageObject)) {
//       return (
//         <div key={messageObject.id}>
//           {renderChatbotMessage(messageObject, index)}
//         </div>
//       );
//     }

//     if (userMessage(messageObject)) {
//       return (
//         <div key={messageObject.id}>{renderUserMessage(messageObject)}</div>
//       );
//     }

//     if (customMessage(messageObject, customMessages)) {
//       return (
//         <div key={messageObject.id}>{renderCustomMessage(messageObject)}</div>
//       );
//     }
//   });
// };

// export const renderCustomMessage = (messageObject: IChatbotMessage) => {
//   const customMessage = customMessages[messageObject.type];

//   const props = {
//     setState,
//     state,
//     scrollIntoView,
//     actionProvider,
//     payload: messageObject.payload,
//     actions
//   };

//   if (messageObject.widget) {
//     const widget = widgetRegistry.getWidget(messageObject.widget, {
//       ...state,
//       scrollIntoView,
//       payload: messageObject.payload,
//       actions
//     });
//     return (
//       <>
//         {customMessage(props)}
//         {widget ? widget : null}
//       </>
//     );
//   }

//   return customMessage(props);
// };

// export const renderUserMessage = (messageObject: IChatbotMessage) => {
//   const widget = widgetRegistry.getWidget(messageObject.widget, {
//     ...state,
//     scrollIntoView,
//     payload: messageObject.payload,
//     actions
//   });
//   return (
//     <>
//       <ChatbotUserMessage
//         message={messageObject.message}
//         key={messageObject.id}
//         customComponents={customComponents}
//       />
//       {widget ? widget : null}
//     </>
//   );
// };

// export const renderChatbotMessage = (
//   messageObject: IChatbotMessage,
//   index: number
// ) => {
//   let withAvatar;
//   if (messageObject.withAvatar) {
//     withAvatar = messageObject.withAvatar;
//   } else {
//     withAvatar = showAvatar(messages, index);
//   }

//   const chatbotMessageProps = {
//     ...messageObject,
//     setState,
//     state,
//     customComponents,
//     widgetRegistry,
//     messages,
//     actions
//   };

//   if (messageObject.widget) {
//     const widget = widgetRegistry.getWidget(chatbotMessageProps.widget, {
//       ...state,
//       scrollIntoView,
//       payload: messageObject.payload,
//       actions
//     });
//     return (
//       <>
//         <ChatbotMessage
//           customStyles={customStyles.botMessageBox}
//           withAvatar={withAvatar}
//           {...chatbotMessageProps}
//           key={messageObject.id}
//         />
//         {chatbotMessageProps.loading !== undefined &&
//           !chatbotMessageProps.loading &&
//           (widget ? widget : null)}
//       </>
//     );
//   }
// };
