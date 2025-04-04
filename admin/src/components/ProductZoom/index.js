import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules"; // Import the Navigation module from Swiper

const ProductZoom = () => {
    const [slideIndex, setslideIndex] = useState(0);
    const zoomSlider = useRef();
    const zoomSliderBig = useRef();

    const goto = (index) => {
        setslideIndex(index);
        zoomSlider.current.swiper.slideTo(index); // Sync the slides
        zoomSliderBig.current.swiper.slideTo(index);
    };

    return (
        <>
            <div className="productZoom">
                <div className="productZoom">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        navigation={false}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="zoomSliderBig"
                        ref={zoomSliderBig}
                    >
                        <SwiperSlide>
                            <div className="item">
                                <img
                                    src={'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg'}
                                    alt="Product 1"
                                    className="w-100"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <img
                                    src={'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg'}
                                    alt="Product 2"
                                    className="w-100"
                                />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <img
                                    src={'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg'}
                                    alt="Product 3"
                                    className="w-100"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={0}
                    navigation={true} // Enable navigation arrows
                    slidesPerGroup={1}
                    modules={[Navigation]} // Pass the Navigation module to Swiper
                    className="zoomSlider"
                    ref={zoomSlider}
                >
                    <SwiperSlide>
                        <div className={`item ${slideIndex === 0 && 'item_active'}`}>
                            <img
                                src={"https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"}
                                alt="Thumbnail 1"
                                className="w-100"
                                onClick={() => goto(0)}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${slideIndex === 1 && 'item_active'}`}>
                            <img
                                src={"https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg"}
                                alt="Thumbnail 2"
                                className="w-100"
                                onClick={() => goto(1)}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item ${slideIndex === 2 && 'item_active'}`}>
                            <img
                                src={"https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg"}
                                alt="Thumbnail 3"
                                className="w-100"
                                onClick={() => goto(2)}
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default ProductZoom;
