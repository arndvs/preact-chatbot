// import React, { useContext } from 'react';
// import { ChatBotContext } from '../../ChatBotContext';
// import ChatBotProductCarousel from './chatbot-product-carousel';

// const HandleNewProductsWidget = (props) => {
//   const state = props?.state;
//   const newProducts =
//     state?.newProducts !== null ? JSON.parse(state?.newProducts) : null;
//   {
//     newProducts;
//   }
//   const botData = useContext(ChatBotContext);

//   const brandColor = botData?.store?.brand_color;
//   return (
//     <div>
//       {newProducts === null ? (
//         <div>There are no new products</div>
//       ) : (
//         <ChatBotProductCarousel
//           products={newProducts}
//           brandColor={brandColor}
//           carouselTitle="New Products"
//         />
//       )}
//     </div>
//   );
// };

// export default HandleNewProductsWidget;
