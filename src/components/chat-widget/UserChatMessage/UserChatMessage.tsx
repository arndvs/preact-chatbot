import React from 'react';

import { callIfExists } from '../Chat/chatUtils';

// import UserIcon from 'src/assets/icons/user-alt.svg';


import { ICustomComponents } from 'src/interfaces/IConfig';
import { reactChatbotKitUserAvatarContainer, reactChatbotKitUserAvatarIcon, reactChatbotKitUserChatMessage, reactChatbotKitUserChatMessageArrow, reactChatbotKitUserChatMessageContainer } from '../ChatWidget.css';

interface IUserChatMessageProps {
  message: string;
  customComponents: ICustomComponents;
}

const UserChatMessage = ({
  message,
  customComponents,
}: IUserChatMessageProps) => {
  const renderUserChatMessage = () => {
    if (customComponents.userChatMessage) {
      return callIfExists(customComponents.userChatMessage, { message });
    } else {
      return (
        <div className={reactChatbotKitUserChatMessage}>
          {message}
          <div className={reactChatbotKitUserChatMessageArrow}></div>
        </div>
      );
    }
  };

  const renderUserAvatar = () => {
    if (customComponents.userAvatar) {
      return callIfExists(customComponents.userAvatar);
    } else {
      return (

          <div className={reactChatbotKitUserAvatarContainer}>
            <img
              src='src/assets/icons/user-alt.svg'
              className={reactChatbotKitUserAvatarIcon}
              alt="User Avatar"
            />
          </div>

      );
    }
  };

  return (
    <div className={reactChatbotKitUserChatMessageContainer}>
      {renderUserChatMessage()}
      {renderUserAvatar()}
    </div>
  );
};

export default UserChatMessage;


// import React from 'react';
// import ConditionallyRender from 'react-conditionally-render';

// import { callIfExists } from '../Chat/chatUtils';

// import UserIcon from 'src/assets/icons/user-alt.svg';

// import './UserChatMessage.css';
// import { ICustomComponents } from 'src/interfaces/IConfig';

// interface IUserChatMessageProps {
//   message: string;
//   customComponents: ICustomComponents;
// }

// const UserChatMessage = ({
//   message,
//   customComponents,
// }: IUserChatMessageProps) => {
//   return (
//     <div className={reactChatbotKitUserChatMessageContainer}>
//       <ConditionallyRender
//         condition={!!customComponents.userChatMessage}
//         show={callIfExists(customComponents.userChatMessage, {
//           message,
//         })}
//         elseShow={
//           <div className={reactChatbotKitUserChatMessage}>
//             {message}
//             <div className={reactChatbotKitUserChatMessageArrow}></div>
//           </div>
//         }
//       />
//       <ConditionallyRender
//         condition={!!customComponents.userAvatar}
//         show={callIfExists(customComponents.userAvatar)}
//         elseShow={
//           <div className="react-chatbot-kit-user-avatar">
//             <div className={reactChatbotKitUserAvatarContainer}>
//                 <img src={UserIcon} className={reactChatbotKitUserAvatarIcon} />
//               {/* <UserIcon className={reactChatbotKitUserAvatarIcon} /> */}
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default UserChatMessage;
