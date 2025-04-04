
// import { useRef, useState } from "react";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
// import { Swiper, SwiperSlide } from "swiper/react"; // Import from 'swiper/react'
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from "swiper/modules"; // Import the Navigation module from Swiper
// import "../../Components/ProductZoom/ProductZoom.css";

// const ProductZoom = (props) => {
//     const [slideIndex, setslideIndex] = useState(0);
//     const zoomSlider = useRef();
//     const zoomSliderBig = useRef();

//     const goto = (index) => {
//         setslideIndex(index);
//         zoomSlider.current.swiper.slideTo(index); // Sync the slides
//         zoomSliderBig.current.swiper.slideTo(index);
//     };

//     return (
//         <>
//             <div className="productZoom">
//                 <div className="productZoom">
//                     <Swiper
//                         slidesPerView={1}
//                         spaceBetween={0}
//                         navigation={false}
//                         slidesPerGroup={1}
//                         modules={[Navigation]}
//                         className="zoomSliderBig"
//                         ref={zoomSliderBig}
//                     >
//                         {
//                             props?.images?.map((img, index) => {
//                                 return (
//                                     <SwiperSlide key={index}>
//                                         <div className="item">
//                                             <InnerImageZoom
//                                                 zoomType="hover"
//                                                 zoomScale={1}
//                                                 src={img}
//                                             />
//                                         </div>
//                                     </SwiperSlide>
//                                 )
//                             })
//                         }
//                     </Swiper>
//                 </div>
//                 <Swiper
//                     slidesPerView={3}
//                     spaceBetween={0}
//                     navigation={true} // Enable navigation arrows
//                     slidesPerGroup={1}
//                     modules={[Navigation]} // Pass the Navigation module to Swiper
//                     className="zoomSlider"
//                     ref={zoomSlider}
//                 >
//                     {
//                         props?.images?.map((img, index) => {
//                             return (
//                                 <SwiperSlide>
//                                     <div className={`item ${slideIndex === index && 'item_active'}`} key={index}>
//                                         <img
//                                             src={img}
//                                             alt=""
//                                             className="w-100"
//                                             onClick={() => goto(index)}
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             )
//                         })
//                     }
//                 </Swiper>
//             </div>
//         </>
//     );
// };

// export default ProductZoom;



// import { useRef, useState } from "react";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import "../../Components/ProductZoom/ProductZoom.css"; // Import the new CSS file
// // Import the new CSS file


// const ProductZoom = ({ images }) => {
//     const [slideIndex, setSlideIndex] = useState(0);
//     const zoomSlider = useRef();
//     const zoomSliderBig = useRef();

//     const goto = (index) => {
//         setSlideIndex(index);
//         zoomSlider.current.swiper.slideTo(index);
//         zoomSliderBig.current.swiper.slideTo(index);
//     };

//     return (
//         <div className="product-zoom-container">
//             <div className="product-zoom-left">
//                 <Swiper
//                     slidesPerView={1}
//                     spaceBetween={0}
//                     navigation={false}
//                     slidesPerGroup={1}
//                     modules={[Navigation]}
//                     className="zoomSliderBig"
//                     ref={zoomSliderBig}
//                 >
//                     {images?.map((img, index) => (
//                         <SwiperSlide key={index}>
//                             <div className="zoom-image">
//                                 <InnerImageZoom zoomType="hover" zoomScale={1.5} src={img} />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//                 <Swiper
//                     slidesPerView={4}
//                     spaceBetween={10}
//                     navigation={true}
//                     slidesPerGroup={1}
//                     modules={[Navigation]}
//                     className="zoomSlider"
//                     ref={zoomSlider}
//                 >
//                     {images?.map((img, index) => (
//                         <SwiperSlide key={index}>
//                             <div className={`thumb-item ${slideIndex === index ? 'active' : ''}`} onClick={() => goto(index)}>
//                                 <img src={img} alt="thumbnail" className="thumbnail" />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </div>
//     );
// };

// export default ProductZoom;
import { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductZoom = ({ images }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderThumbs = useRef();

    const goto = (index) => {
        setSlideIndex(index);

        if (zoomSliderThumbs.current?.swiper) {
            zoomSliderThumbs.current.swiper.slideTo(index);
        }

        if (zoomSliderBig.current?.swiper) {
            zoomSliderBig.current.swiper.slideTo(index);
        }
    };

    return (
        <div className="product-zoom-container">
            {/* Main Image */}
            <div className="product-zoom-main">
                <div className="zoom-background">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={false}
                        modules={[Navigation]}
                        className="main-slider"
                        ref={zoomSliderBig}
                    >
                        {images?.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="zoom-image">
                                    <InnerImageZoom
                                        zoomType="hover"
                                        zoomScale={1.8}
                                        src={img}
                                        imgAttributes={{
                                            style: {
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "contain",
                                            },
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Thumbnails (Below on Mobile) */}
            <div className="product-zoom-thumbnails">
                <Swiper
                    ref={zoomSliderThumbs}
                    slidesPerView={4}  // Show 4 thumbnails on desktop
                    spaceBetween={10}  // Add space between thumbnails
                    navigation={false}
                    modules={[Navigation]}
                    className="thumb-slider"
                    breakpoints={{
                        768: {
                            direction: "vertical", // Desktop: Thumbnails on left
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        0: {
                            direction: "horizontal", // Mobile: Thumbnails below
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                    }}
                >
                    {images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`thumb-item ${slideIndex === index ? 'active' : ''}`}
                                onClick={() => goto(index)}
                            >
                                <img src={img} alt="thumbnail" className="thumbnail" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


            </div>
        </div>
    );
};

export default ProductZoom;
