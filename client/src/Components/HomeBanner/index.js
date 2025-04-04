
// import React from "react";
// import Slider from "react-slick";

// const HomeBanner = () => {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         pauseOnHover: true,
//     };

//     return (
//         <div className="container">
//             <div className="homeBannerSection">
//                 <Slider {...settings}>
//                     <div className="item">
//                         <img
//                             src="https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26108.jpg?tr=w-1920,q=80"
//                             className="w-100"
//                             alt="Banner 1"
//                         />
//                     </div>
//                     <div className="item">
//                         <img
//                             src="https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26109.jpg?tr=w-1920,q=80"
//                             className="w-100"
//                             alt="Banner 2"
//                         />
//                     </div>
//                     <div className="item">
//                         <img
//                             src="https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26111.jpg?tr=w-1920,q=80"
//                             className="w-100"
//                             alt="Banner 3"
//                         />
//                     </div>
//                 </Slider>
//             </div>
//         </div>
//     );
// }

// export default HomeBanner;





import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        appendDots: dots => <ul className="custom-dots">{dots}</ul>,
    };

    return (
        <div className="home-banner">
            <div className="home-banner-overlay">
                <div className="content">
                    <h1>We bring the store to your door</h1>
                    <p>Get organic produce and sustainably sourced groceries delivered at up to 4% off.</p>
                    <button className="shop-btn">Shop now</button>
                </div>

                <div className="slider-container">
                    <Slider {...settings}>
                        <div className="slide-item">
                            <img src="https://source.unsplash.com/600x400/?groceries" alt="Fresh Groceries" />
                        </div>
                        <div className="slide-item">
                            <img src="https://source.unsplash.com/600x400/?vegetables" alt="Organic Vegetables" />
                        </div>
                        <div className="slide-item">
                            <img src="https://source.unsplash.com/600x400/?shopping" alt="Grocery Shopping" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;
