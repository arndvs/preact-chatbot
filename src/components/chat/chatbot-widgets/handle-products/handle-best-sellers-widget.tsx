// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';
// import ChatBotProductCarousel from './chatbot-product-carousel';

// const HandleBestSellersWidget = (props) => {
//   const state = props?.state;
//   const bestSellers =
//     state.bestSellers !== null ? JSON.parse(state?.bestSellers) : null;
//   const botData = useContext(ChatBotContext);

//   const brandColor = botData?.store?.brand_color;
//   return (
//     <div>
//       {bestSellers === null ? (
//         <div>There are no best sellers</div>
//       ) : (
//         <ChatBotProductCarousel
//           products={bestSellers}
//           brandColor={brandColor}
//           carouselTitle="Best Sellers"
//         />
//       )}
//     </div>
//   );
// };

// export default HandleBestSellersWidget;
