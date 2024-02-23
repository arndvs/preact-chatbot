import { style } from '@vanilla-extract/css';

export const bgRed = style({
  border: 'none',
  backgroundColor: '#ff0000',
  borderRadius: '15px',
  padding: '20px',
  fontWeight: 'bold',
  color: 'purple',
  cursor: 'pointer',
  fontFamily: 'inherit'
});

export const bgGreen = style({
  border: 'none',
  backgroundColor: '#14c879',
  borderRadius: '15px',
  padding: '20px',
  fontWeight: 'bold',
  color: 'purple',
  cursor: 'pointer',
  fontFamily: 'inherit'
});

// react-chatbot-kit-user-chat-message-container
export const ChatbotUserMessageContainer = style({
  display: 'flex',
  margin: '15px 0',
  justifyContent: 'flex-end'
});

// react-chatbot-kit-user-avatar-container
export const UserAvatarContainer = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginLeft: '12.5px',
  backgroundColor: '#3d4e8d',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

// react-chatbot-kit-user-avatar-icon
export const UserAvatarIcon = style({
  fill: '#fff',
  width: '15px',
  height: '15px'
});

// react-chatbot-kit-user-chat-message
export const ChatbotUserMessage = style({
  backgroundColor: '#f1f1f1',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '0.9rem',
  color: '#585858',
  fontWeight: 'medium',
  position: 'relative',
  textAlign: 'left'
});

// react-chatbot-kit-user-chat-message-arrow
export const ChatbotUserMessageArrow = style({
  width: '0',
  height: '0',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent',
  borderLeft: '8px solid #f1f1f1',
  position: 'absolute',
  right: '-7px',
  top: '13px'
});

// react-chatbot-kit-chat-bot-message-container
export const ChatBotMessageContainer = style({
  display: 'flex',
  margin: '15px 0',
  justifyContent: 'flex-start'
});

// react-chatbot-kit-chat-bot-avatar-container
export const ChatBotAvatarContainer = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  fontSize: '1.2rem',
  marginRight: '12.5px',
  backgroundColor: '#d8d8d8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

// react-chatbot-kit-chat-bot-avatar-icon
export const ChatBotAvatarIcon = style({
  fill: '#494646',
  width: '22.5px',
  height: '22.5px'
});

// react-chatbot-kit-chat-bot-avatar-letter
export const ChatBotAvatarLetter = style({
  color: '#1d1d1d',
  margin: '0',
  padding: '0'
});

// react-chatbot-kit-chat-bot-message
export const ChatBotMessage = style({
  backgroundColor: '#2898ec',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '0.9rem',
  color: '#fff',
  fontWeight: 'medium',
  position: 'relative',
  width: '100%',
  marginLeft: 'auto',
  textAlign: 'left'
});

// react-chatbot-kit-chat-bot-message-arrow
export const ChatBotMessageArrow = style({
  width: '0',
  height: '0',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent',
  borderRight: '8px solid #2898ec',
  position: 'absolute',
  left: '-7px',
  top: '13px'
});

// react-chatbot-kit-chat-bot-loading-icon-container
export const ChatBotLoadingIconContainer = style({
  height: '17px',
  width: '25px'
});

// chatbot-loader-container
export const chatbotLoaderContainer = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

//   #chatbot-loader #chatbot-loader-dot1 {
//     animation: load 1s infinite;
//   }
export const loaderDot1 = style({
  animation: 'load 1s infinite'
});

//   #chatbot-loader #chatbot-loader-dot2 {
//     animation: load 1s infinite;
//     animation-delay: 0.2s;
//   }
export const loaderDot2 = style({
  animation: 'load 1s infinite',
  animationDelay: '0.2s'
});

//   #chatbot-loader #chatbot-loader-dot3 {
//     animation: load 1s infinite;
//     animation-delay: 0.4s;
//   }
export const loaderDot3 = style({
  animation: 'load 1s infinite',
  animationDelay: '0.4s'
});

//   @keyframes load {
//     0% {
//       opacity: 0;
//     }
//     50% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 0;
//     }
//   }
const keyframes = {
  '0%': { opacity: 0 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0 }
};

//react-chatbot-kit-chat-container
export const ChatContainer = style({
  position: 'relative',
  width: '100%'
});

// react-chatbot-kit-chat-inner-container
export const ChatInnerContainer = style({
  height: '100%',
  backgroundColor: '#fff',
  borderRadius: '5px'
});

// react-chatbot-kit-chat-header
export const ChatHeader = style({
  borderTopRightRadius: '5px',
  borderTopLeftRadius: '5px',
  backgroundColor: '#efefef',
  fontFamily: 'Arial',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.85rem',
  color: '#514f4f',
  padding: '12.5px',
  fontWeight: 'bold'
});

// react-chatbot-kit-chat-input-container
export const ChatInputContainer = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  display: 'flex'
});

// react-chatbot-kit-chat-message-container
export const ChatMessageContainer = style({
  padding: '0 17.5px 10px 17.5px',
  overflow: 'scroll',
  height: '424px'
});

// react-chatbot-kit-chat-input
export const ChatInput = style({
  width: '100%',
  padding: '12.5px',
  border: 'none',
  fontSize: '0.85rem',
  borderTop: '1px solid #d8d8d8',
  borderBottomLeftRadius: '5px'
});

// react-chatbot-kit-chat-input-form
export const ChatInputForm = style({
  width: '100%',
  display: 'flex'
});

//   .react-chatbot-kit-chat-input::placeholder {
//     color: #585858;
//   }
export const ChatInputPlaceholder = style({
  '::placeholder': {
    color: '#585858'
  }
});

// react-chatbot-kit-chat-btn-send
export const ChatBtnSend = style({
  backgroundColor: '#ff8800',
  width: '100px',
  border: 'none',
  color: '#fff',
  borderBottomRightRadius: '5px'
});

// react-chatbot-kit-chat-btn-send-icon
export const ChatBtnSendIcon = style({
  fill: '#fff',
  width: '15px',
  margin: '0 auto'
});

// react-chatbot-kit-error
export const Error = style({
  backgroundColor: '#fff',
  borderRadius: '3px',
  padding: '15px'
});

// react-chatbot-kit-error-container
export const ErrorContainer = style({
  width: '260px'
});

// react-chatbot-kit-error-header
export const ErrorHeader = style({
  fontSize: '1.3rem',
  color: '#1d1d1d',
  marginBottom: '30px'
});

// react-chatbot-kit-error-docs
export const ErrorDocs = style({
  display: 'block',
  margin: '25px auto',
  color: 'rgb(56, 104, 139)',
  padding: '8px',
  border: '1px solid rgb(40, 152, 236)',
  width: '130px',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '1rem'
});
