// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';
// import ChatBotProductCarousel from './chatbot-product-carousel';

// const HandleRecommendedProductsWidget = (props) => {
//   const botData = useContext(ChatBotContext);
//   // TODO COME BACK AND USE AXIOS CALL INSTEAD OF PAGE DATA
//   // const state = props?.state;
//   // const recommendedProducts = state?.recommended_products
//   //   ? JSON.parse(state?.recommended_products)
//   //   : null;
//   const recommendedProducts = botData?.recommended_products;

//   const brandColor = botData?.store?.brand_color;

//   return (
//     <div>
//       {recommendedProducts === null ? (
//         <div>There are no recommended products</div>
//       ) : (
//         <ChatBotProductCarousel
//           products={recommendedProducts}
//           brandColor={brandColor}
//           carouselTitle="Product Recommendations"
//         />
//       )}
//     </div>
//   );
// };

// export default HandleRecommendedProductsWidget;
