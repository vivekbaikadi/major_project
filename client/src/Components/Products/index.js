
// import React, { useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import Button from '@mui/material/Button';
// import { FaArrowRightLong } from "react-icons/fa6";
// import ProductItem from "../../Components/ProductItem";
// import 'swiper/css';
// import 'swiper/css/navigation';

// const Products = ({ ProductList, onViewAll }) => {
//     return (
//         <section className="homeProducts" id="featured-products">  {/* Added id here */}
//             <div className="container">
//                 <div className="productRow">
//                     <div className="sellopp d-flex align-items-center">
//                         <div className="info">
//                             <h3 className="mb-0 hd">FEATURED PRODUCTS</h3>
//                             <p className="text-light text-sml mb-0">
//                                 Do not miss the current offers until the end of March.
//                             </p>
//                         </div>

//                         <Button className="viewAllBtn" onClick={onViewAll}>
//                             View all <FaArrowRightLong />
//                         </Button>
//                     </div>

//                     <div className="product_row w-100 mt-4">
//                         <Swiper
//                             spaceBetween={10}
//                             modules={[Navigation]}
//                             className="mySwiper"
//                             breakpoints={{
//                                 0: { slidesPerView: 2 },
//                                 640: { slidesPerView: 3 },
//                                 1024: { slidesPerView: 4 },
//                             }}
//                         >
//                             {ProductList?.products?.map((item, index) => (
//                                 <SwiperSlide key={index}>
//                                     <ProductItem item={item} />
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };


// export default Products;




import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Button from '@mui/material/Button';
import { FaArrowRightLong } from 'react-icons/fa6';
import ProductItem from '../../Components/ProductItem';
import 'swiper/css';
import 'swiper/css/navigation';

const Products = ({ ProductList, onViewAll }) => {
    return (
        <section className="homeProducts" id="featured-products">
            <div className="container">
                <div className="productRow">
                    <div className="sellopp d-flex align-items-center justify-content-between">
                        <div className="info">
                            <h3 className="mb-0 hd">You might need</h3>
                        </div>
                        <button className="viewAllBtn" onClick={onViewAll}>
                            See more <FaArrowRightLong />
                        </button>
                    </div>

                    <div className="product_row w-100 mt-4">
                        <Swiper
                            spaceBetween={15}
                            modules={[Navigation]}
                            navigation
                            className="mySwiper mb-5"
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {ProductList?.products?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ProductItem item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
