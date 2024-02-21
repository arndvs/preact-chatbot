import React from 'react';

import { callIfExists } from '../Chat/chatUtils';

// import UserIcon from 'src/assets/icons/user-alt.svg';


import { ICustomComponents } from 'src/types/IConfig';
import * as styles from '../../../styles/ChatWidget.css';

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
        <div className={styles.UserChatMessage}>
          {message}
          <div className={styles.UserChatMessageArrow}></div>
        </div>
      );
    }
  };

  const renderUserAvatar = () => {
    if (customComponents.userAvatar) {
      return callIfExists(customComponents.userAvatar);
    } else {
      return (

          <div className={styles.UserAvatarContainer}>
            <img
              src='src/assets/icons/user-alt.svg'
              className={styles.UserAvatarIcon}
              alt="User Avatar"
            />
          </div>

      );
    }
  };

  return (
    <div className={styles.UserChatMessageContainer}>
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
//     <div className={styles.UserChatMessageContainer}>
//       <ConditionallyRender
//         condition={!!customComponents.userChatMessage}
//         show={callIfExists(customComponents.userChatMessage, {
//           message,
//         })}
//         elseShow={
//           <div className={styles.UserChatMessage}>
//             {message}
//             <div className={styles.UserChatMessageArrow}></div>
//           </div>
//         }
//       />
//       <ConditionallyRender
//         condition={!!customComponents.userAvatar}
//         show={callIfExists(customComponents.userAvatar)}
//         elseShow={
//           <div className="react-chatbot-kit-user-avatar">
//             <div className={styles.UserAvatarContainer}>
//                 <img src={UserIcon} className={styles.UserAvatarIcon} />
//               {/* <UserIcon className={styles.UserAvatarIcon} /> */}
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default UserChatMessage;
