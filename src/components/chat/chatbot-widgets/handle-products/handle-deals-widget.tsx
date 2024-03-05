// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';
// import ChatBotProductCarousel from './chatbot-product-carousel';

// const HandleDealsWidget = (props) => {
//   const state = props?.state;
//   const currentDeals =
//     state?.currentDeals !== null ? JSON.parse(state?.currentDeals) : null;

//   const botData = useContext(ChatBotContext);
//   const brandColor = botData?.store?.brand_color;

//   return (
//     <div>
//       {currentDeals === null ? (
//         <div>There are no current deals</div>
//       ) : (
//         <ChatBotProductCarousel
//           products={currentDeals}
//           brandColor={brandColor}
//           carouselTitle="Deals of the Month"
//         />
//       )}
//     </div>
//   );
// };

// export default HandleDealsWidget;
