// import { useContext } from "react";
// import { MyContext } from "../../App";
// import { useNavigate } from "react-router-dom";
// import HomeBanner from "../../Components/HomeBanner";
// import Button from '@mui/material/Button';
// import { FaArrowRightLong } from "react-icons/fa6";
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import ProductItem from "../../Components/ProductItem";
// import Barcode from "../../Components/Barcode"
// import { fetchDataFromApi } from "../../../../client/src/utils/api";



// const Home = () => {


//     const context = useContext(MyContext);
//     const [ProductList, setproductList] = useState([]);

//     useEffect(() => {

//         context.setisHeaderShow(true);
//         context.setisFooterShow(true);

//         fetchDataFromApi("/api/products").then((res) => {
//             setproductList(res)
//         })
//     }, []);

//     const navigate = useNavigate();


//     return (
//         <>
//             <HomeBanner />

//             <section className="homeProducts">
//                 <div className="container">
//                     <div className="productRow">
//                         <div className="sellopp d-flex align-items-center">
//                             <div className="info">
//                                 <h3 className="mb-0 hd">FEATURED PRODUCTS</h3>
//                                 <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
//                             </div>

//                             <Button className="viewAllBtn" onClick={() => navigate("/products?viewAll=true")}>View all<FaArrowRightLong /></Button>
//                         </div>

//                         <div className="product_row w-100 mt-4">
//                             <Swiper
//                                 spaceBetween={10}
//                                 pagination={{
//                                     clickable: true,
//                                 }}
//                                 modules={[Navigation]}
//                                 className="mySwiper"
//                                 breakpoints={{
//                                     0: { // For screens larger than 0px (i.e., all devices)
//                                         slidesPerView: 2, // Set to 2 for mobile view
//                                     },
//                                     640: { // For screens larger than 640px (e.g., small tablets)
//                                         slidesPerView: 3, // Optional: Adjust as needed for small tablets
//                                     },
//                                     1024: { // For screens larger than 1024px (e.g., laptops)
//                                         slidesPerView: 4, // Set to 4 for laptops and larger
//                                     },
//                                 }}
//                             >
//                                 {
//                                     ProductList?.products?.length !== 0 && ProductList?.products?.map((item, index)=>{
//                                         return(
//                                             <SwiperSlide key={index}>
//                                                 <ProductItem item={item} />
//                                             </SwiperSlide>
//                                         )
//                                     })
//                                 }

//                             </Swiper>
//                         </div>

//                     </div>
//                 </div>
//             </section>
//             <Barcode />

//         </>
//     )
// }

// export default Home;







import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../App";
import img1 from "../../assets/images/grocery7.jpg";
import img2 from "../../assets/images/grocery8.webp";
import img3 from "../../assets/images/grocery.jpg";
import "../Home/Home.css";
import Products from "../../Components/Products";
import { fetchDataFromApi } from "../../../../client/src/utils/api";
import { useNavigate } from "react-router-dom";

import React from 'react';
import Header from "../../Components/Header";



const sliderData = [img1, img2, img3];



const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);
    const context = useContext(MyContext);
    const [ProductList, setProductList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataFromApi("/api/products").then((res) => {
            setProductList(res);
        });
    }, [context]);


    const handleScanStart = () => {
        
        navigate('/scan'); // Navigate to the ProductDetails page
    };

    // Remove the separate Products page navigation
    const handleViewAll = () => {
        // Optional: If you want View All to go to a separate page
        navigate("/products?viewAll=true");
    };

    useEffect(() => {
        context.setisFooterShow(true);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    };

    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 30000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="home">
            
            <Header/>
            <div className="slider">
                <div className="list">
                    {sliderData.map((image, index) => (
                        <div className={`item ${index === currentSlide ? "active" : ""}`} key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Static Text - Always Visible */}
                <div className="slider-text">
                    <h2>Experience the Best Shopping</h2>
                    <p>Discover a wide range of products at amazing prices.</p>
                    <button className="start-scan-btn" onClick={handleScanStart}>Start Scan</button>
                </div>


                <div className="dots">
                    {sliderData.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentSlide ? "active" : ""}`}
                            onClick={() => setCurrentSlide(index)} /* Dots now change the slide */
                        ></span>
                    ))}
                </div>

            </div>
            <Products
                ProductList={ProductList}
                onViewAll={handleViewAll}
                id="products"  // Add this prop
            />
        </div>
    );
};

export default Home;
