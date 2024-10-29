// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';

// interface Hour {
//   id: number;
//   day: string;
//   open: string;
//   close: string;
// }

// const HandleHoursWidget: React.FC = () => {
//   const botData = useContext(ChatBotContext);
//   const store = botData?.store;
//   const twelveHourClock = (militaryTime: string | undefined): string => {
//     if (!militaryTime) {
//       return new Date().toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//       });
//     }

//     const [hours, minutes] = militaryTime.split(':');
//     const time = new Date();
//     time.setHours(parseInt(hours, 10));
//     time.setMinutes(parseInt(minutes, 10));

//     return time.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true
//     });
//   };

//   const hours: Hour[] = [
//     {
//       id: 1,
//       day: 'Sunday',
//       open: twelveHourClock(store.hours_sun_open),
//       close: twelveHourClock(store.hours_sun_close)
//     },
//     {
//       id: 2,
//       day: 'Monday',
//       open: twelveHourClock(store.hours_mon_open),
//       close: twelveHourClock(store.hours_mon_close)
//     },
//     {
//       id: 3,
//       day: 'Tuesday',
//       open: twelveHourClock(store.hours_tue_open),
//       close: twelveHourClock(store.hours_tue_close)
//     },
//     {
//       id: 4,
//       day: 'Wednesday',
//       open: twelveHourClock(store.hours_wed_open),
//       close: twelveHourClock(store.hours_wed_close)
//     },
//     {
//       id: 5,
//       day: 'Thursday',
//       open: twelveHourClock(store.hours_thu_open),
//       close: twelveHourClock(store.hours_thu_close)
//     },
//     {
//       id: 6,
//       day: 'Friday',
//       open: twelveHourClock(store.hours_fri_open),
//       close: twelveHourClock(store.hours_fri_close)
//     },
//     {
//       id: 7,
//       day: 'Saturday',
//       open: twelveHourClock(store.hours_sat_open),
//       close: twelveHourClock(store.hours_sat_close)
//     }
//   ];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="mt-10 -mx-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
//         <div>
//           {hours.map((hour) => (
//             <div
//               className="flex items-center justify-between"
//               key={hour.id}
//             >
//               <div>{hour.day}</div>

//               <div className="flex items-center gap-x-2.5 px-2 !text-xs leading-5 text-gray-400">
//                 <p className="truncate"> {hour.open}</p>
//                 <span className="flex-none w-2 h-2 pl-2 pr-2 mx-2 text-gray-300">
//                   —
//                 </span>

//                 <p className="whitespace-nowrap">{hour.close}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HandleHoursWidget;
