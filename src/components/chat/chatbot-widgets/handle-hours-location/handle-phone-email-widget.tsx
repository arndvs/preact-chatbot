// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';

// const HandlePhoneEmailWidget = (props) => {
//   const botData = useContext(ChatBotContext);
//   const store = botData?.store;
//   const formatPhoneNumber = (phoneNumber) => {
//     if (!phoneNumber) return;
//     // Remove the country code if present
//     const cleaned = phoneNumber.replace(/^\+1/, '');

//     // Remove all non-digit characters from the phone number
//     const digitsOnly = cleaned.replace(/\D/g, '');

//     // Format the cleaned number in the US-based format
//     const match = digitsOnly.match(/^(\d{3})(\d{3})(\d{4})$/);
//     if (match) {
//       return `(${match[1]}) ${match[2]}-${match[3]}`;
//     }

//     // Return the original phone number if it cannot be formatted
//     return phoneNumber;
//   };

//   const storePhone = formatPhoneNumber(store?.phone) ?? 'N/A';
//   const storeEmail = store?.email ?? 'N/A';

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="mt-10 -mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
//         <div>
//           <div>
//             <div className="flex items-center justify-between">
//               <div>phone:</div>
//               <div className="!text-sm font-bold">{storePhone ?? 'N/A'}</div>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>email:</div>
//               <div className="!text-sm font-bold">{storeEmail ?? 'N/A'}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HandlePhoneEmailWidget;
