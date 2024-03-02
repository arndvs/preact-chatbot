// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Scrollbar } from 'swiper';

// interface Product {
//   id: number;
//   ulid?: number;
//   store_id: number;
//   user_id: number;
//   sequence: number;
//   created_at: string;
//   updated_at: string;
//   product_menu_url: string;
//   img_url: string;
//   product_name: string;
//   product_price: string;
//   product_brand_name: string;
//   product_category_name?: string;
//   product_description: string;
//   product_id?: number;
// }

// type Props = {
//   brandColor: string;
//   products: Product[];
//   carouselTitle: string;
// };

// function ChatBotProductCarousel({
//   brandColor,
//   products,
//   carouselTitle
// }: Props) {
//   const productIdentifier = () => {
//     switch (carouselTitle) {
//       case 'Product Recommendations':
//         return {
//           nameIdentifier: 'name',
//           imgSrcIdentifier: 'image_url'
//         };
//       case 'Deals of the Month':
//         return {
//           nameIdentifier: 'product_name',
//           imgSrcIdentifier: 'img_url'
//         };
//       case 'Best Sellers':
//         return {
//           nameIdentifier: 'name',
//           imgSrcIdentifier: 'image_url'
//         };
//       case 'New Products':
//         return {
//           nameIdentifier: 'name',
//           imgSrcIdentifier: 'image_url'
//         };
//       default:
//         return {
//           nameIdentifier: 'name',
//           imgSrcIdentifier: 'image_url'
//         };
//     }
//   };
//   return (
//     <Swiper
//       modules={[Scrollbar, Navigation]}
//       spaceBetween={50}
//       loop={true}
//       slidesPerView={1}
//       breakpoints={{
//         480: { slidesPerView: 2 },
//         768: { slidesPerView: 2 },
//         1024: { slidesPerView: 2 }
//       }}
//       navigation={true}
//       scrollbar={false}
//       style={{
//         zIndex: 0,
//         paddingLeft: '3rem',
//         paddingRight: '3rem',
//         ...({
//           '--swiper-navigation-color': `${brandColor ?? '#e5e5e5'}`,
//           '--swiper-pagination-color': `${brandColor ?? '#e5e5e5'}`
//         } as React.CSSProperties)
//       }}
//     >
//       <section
//         aria-labelledby="products-heading"
//         className="mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8"
//       >
//         <h2
//           id="products-heading"
//           className="sr-only"
//         >
//           {carouselTitle}
//         </h2>

//         <div className="grid grid-cols-2 -mx-px border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <SwiperSlide key={product.id}>
//               <div className="relative py-4 group sm:py-6">
//                 <div className="overflow-hidden bg-gray-200 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
//                   <img
//                     src={
//                       product[productIdentifier().imgSrcIdentifier] ??
//                       '/images/placeholder-box-product.png'
//                     }
//                     alt={product[productIdentifier().nameIdentifier]}
//                     className="object-cover object-center w-full h-full"
//                   />
//                 </div>
//                 <div className="pt-5 pb-4 text-center">
//                   <h3 className="text-sm font-medium text-gray-900">
//                     <a href={product.product_menu_url ?? ''}>
//                       <span
//                         aria-hidden="true"
//                         className="absolute inset-0"
//                       />
//                       {product[productIdentifier().nameIdentifier]}
//                     </a>
//                   </h3>
//                   <p className="mt-4 text-base font-medium text-gray-900">
//                     {product.product_price}
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </div>
//       </section>
//     </Swiper>
//   );
// }

// export default ChatBotProductCarousel;
