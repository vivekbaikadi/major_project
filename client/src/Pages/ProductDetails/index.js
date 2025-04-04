

//main code

// import ProductZoom from "../../Components/ProductZoom";
// import Rating from '@mui/material/Rating';
// import { FaRegHeart } from "react-icons/fa6";
// import Button from '@mui/material/Button';
// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import { MyContext } from "../../App";
// import { fetchDataFromApi, postData } from "../../utils/api";

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [productData, setProductData] = useState({});
//     const context = useContext(MyContext);

//     useEffect(() => {
//         fetchDataFromApi(`/api/products/${id}`).then((res) => {
//             setProductData(res);
//         });
//     }, [id]);

//     const addToMyList = () => {
//         const user = JSON.parse(localStorage.getItem("user"));

//         if (!user || !user.userId) {
//             console.error("❌ No userId found in localStorage! Check if user is logged in.");
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: "You need to log in to add items to the wishlist!",
//             });
//             return;
//         }

//         if (!productData || !productData.name) {
//             console.error("❌ Product data is not loaded yet!");
//             return;
//         }

//         const data = {
//             productTitle: productData?.name,
//             image: productData?.images?.[0] || "",
//             rating: productData?.rating || 0,
//             price: parseFloat(productData?.price || 0),  // Ensure price is a number
//             productId: id,
//             userId: user?.userId
//         };

//         console.log("📩 Sending Data to Wishlist API:", data);  // Debugging step

//         postData(`/api/my-list/add`, data)  // ✅ Fixed API URL (Removed extra "/")
//             .then((res) => {
//                 console.log("📥 Wishlist API Response:", res);  // Debugging step

//                 if (res?.success) {
//                     context.setAlertBox({
//                         open: true,
//                         error: false,
//                         msg: "The product has been added to your Wishlist!"
//                     });
//                 } else {
//                     context.setAlertBox({
//                         open: true,
//                         error: true,
//                         msg: res?.message || "Product is already in the WishList!"
//                     });
//                 }
//             })
//             .catch((err) => {
//                 console.error("❌ Wishlist API Error:", err);
//                 context.setAlertBox({
//                     open: true,
//                     error: true,
//                     msg: "An error occurred while adding to Wishlist!"
//                 });
//             });
//     };


//     return (
//         <section className="productDetails section">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-5">
//                         <ProductZoom images={productData?.images} />
//                     </div>
//                     <div className="col-md-7">
//                         <h2 className="hd text-capitalize">{productData?.name}</h2>
//                         <ul className="list list-inline d-flex align-items-center">
//                             <li className="list-inline-item">
//                                 <div className="d-flex align-items-center">
//                                     <span className="text-light" style={{ marginRight: "3px" }}>Brand :</span>
//                                     <span>{productData?.brand}</span>
//                                 </div>
//                             </li>
//                             <li className="list-inline-item">
//                                 <div className="d-flex align-items-center">
//                                     <Rating name="read-only" value={parseFloat(productData?.rating || 0)} readOnly size="small" precision={0.5} />
//                                     <span className="text-light cursor" style={{ marginLeft: "3px" }}>1 Review</span>
//                                 </div>
//                             </li>
//                         </ul>

//                         <div className="d-flex align-items-center info mb-3">
//                             <span className="oldPrice">INR {productData?.oldPrice}</span>
//                             <span className="netPrice text-danger">INR {productData?.price}</span>
//                         </div>
//                         <span className="badge bg-success d-block">IN STOCK</span>

//                         <p className="mt-3">{productData?.description}</p>

//                         <Button 
//                             className="btn-round btn-sml mt-3" 
//                             variant="outlined" 
//                             onClick={addToMyList}
//                         >
//                             <FaRegHeart /> &nbsp; Add to Wishlist
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ProductDetails;



//modified code

// import ProductZoom from "../../Components/ProductZoom";
// import Rating from '@mui/material/Rating';
// import { FaRegHeart } from "react-icons/fa6";
// import Button from '@mui/material/Button';
// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import { MyContext } from "../../App";
// import { fetchDataFromApi, postData } from "../../utils/api";

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [productData, setProductData] = useState({});
//     const context = useContext(MyContext);

//     useEffect(() => {
//         context.setisFooterShow(false);
//         fetchDataFromApi(`/api/products/${id}`).then((res) => {
//             setProductData(res);
//         });
//     }, [id]);

//     const addToMyList = () => {
//         const user = JSON.parse(localStorage.getItem("user"));

//         if (!user || !user.userId) {
//             console.error("❌ No userId found in localStorage!");
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: "You need to log in to add items to the wishlist!",
//             });
//             return;
//         }

//         if (!productData || !productData.name) {
//             console.error("❌ Product data is not loaded yet!");
//             return;
//         }

//         const data = {
//             productTitle: productData?.name,
//             image: productData?.images?.[0] || "",
//             rating: parseFloat(productData?.rating || 0),
//             price: parseFloat(productData?.price || 0),
//             productId: id,
//             userId: user?.userId
//         };

//         console.log("📩 Sending Data to Wishlist API:", data);

//         postData(`/api/my-list/add`, data)  
//             .then((res) => {
//                 console.log("📥 Wishlist API Response:", res);

//                 if (res?.success) {
//                     context.setAlertBox({
//                         open: true,
//                         error: false,
//                         msg: "The product has been added to your Wishlist!"
//                     });
//                 } else {
//                     context.setAlertBox({
//                         open: true,
//                         error: true,
//                         msg: res?.message || "Product is already in the WishList!"
//                     });
//                 }
//             })
//             .catch((err) => {
//                 console.error("❌ Wishlist API Error:", err);
//                 context.setAlertBox({
//                     open: true,
//                     error: true,
//                     msg: "An error occurred while adding to Wishlist!"
//                 });
//             });
//     };


// return (
//     <section className="productDetails section">
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-5">
//                     <ProductZoom images={productData?.images} />
//                 </div>
//                 <div className="col-md-7">
//                     <h2 className="hd text-capitalize">{productData?.name}</h2>
//                     <ul className="list list-inline d-flex align-items-center">
//                         <li className="list-inline-item">
//                             <div className="d-flex align-items-center">
//                                 <span className="text-light" style={{ marginRight: "3px" }}>Brand :</span>
//                                 <span>{productData?.brand}</span>
//                             </div>
//                         </li>
//                         <li className="list-inline-item">
//                             <div className="d-flex align-items-center">
//                                 <Rating name="read-only" value={parseFloat(productData?.rating || 0)} readOnly size="small" precision={0.5} />
//                                 <span className="text-light cursor" style={{ marginLeft: "3px" }}>1 Review</span>
//                             </div>
//                         </li>
//                     </ul>

//                     <div className="d-flex align-items-center info mb-3">
//                         <span className="oldPrice">INR {productData?.oldPrice}</span>
//                         <span className="netPrice text-danger">INR {productData?.price}</span>
//                     </div>
//                     <span className="badge bg-success d-block">IN STOCK</span>

//                     <p className="mt-3">{productData?.description}</p>

//                     <Button
//                         className="btn-round btn-sml mt-3"
//                         variant="outlined"
//                         onClick={addToMyList}
//                     >
//                         <FaRegHeart /> &nbsp; Add to Wishlist
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     </section>
// );
// };

// export default ProductDetails;



//dynamic rating

import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
// import "../ProductDetails/ProductdetailsStyling.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [tempRating, setTempRating] = useState(0); // Holds rating before submission
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisFooterShow(true);
        context.setisHeaderShow(true);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);

            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.userId && res.ratings) {
                const existingRating = res.ratings.find(r => r.userId === user.userId);
                if (existingRating) {
                    setUserRating(existingRating.rating);
                    setTempRating(existingRating.rating); // Pre-fill the rating
                }
            }
        });
    }, [id, context]);

    const addToMyList = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.userId) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "You need to log in to add items to the wishlist!",
            });
            return;
        }

        const data = {
            productTitle: productData?.name,
            image: productData?.images?.[0] || "",
            rating: parseFloat(productData?.rating || 0),
            price: parseFloat(productData?.price || 0),
            productId: id,
            userId: user?.userId
        };

        postData(`/api/my-list/add`, data)
            .then((res) => {
                if (res?.success) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "The product has been added to your Wishlist!"
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res?.message || "Product is already in the Wishlist!"
                    });
                }
            })
            .catch(() => {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "An error occurred while adding to Wishlist!"
                });
            });
    };

    const submitRating = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.userId) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "You need to log in to rate products!",
            });
            return;
        }

        const ratingData = { rating: tempRating };

        postData(`/api/products/${id}/rate`, ratingData)
            .then((res) => {
                if (res.success) {
                    setUserRating(tempRating);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Thank you for your feedback!",
                    });

                    // Fetch updated product data for details page
                    fetchDataFromApi(`/api/products/${id}`).then((updatedRes) => {
                        setProductData({ ...updatedRes }); // ✅ Ensures a re-render
                    });

                    // ✅ Re-fetch product list to update ratings
                    if (context.refreshProductList) {
                        context.refreshProductList();
                    }
                }
            })
            .catch(() => {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "An error occurred while submitting your rating!",
                });
            });
    };


    return (
        <section className="productDetails section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ProductZoom images={productData?.images} />
                    </div>
                    <div className="col-md-6">
                        <h2 className="product-title mb-2">
                            {productData?.name}
                        </h2>

                        {/* Rating & reviews */}
                        <div className="rating d-flex align-items-center mb-2">
                            <Rating
                                value={productData?.avgRating || 0}
                                precision={0.5}
                                readOnly
                            />
                            <span className="ms-2 text-muted">
                                {productData?.avgRating
                                    ? productData.avgRating.toFixed(1)
                                    : "No ratings yet"}{" "}
                                |{" "}
                                <span className="review-count">
                                    {productData?.ratings?.length || 0}{" "}
                                    Reviews
                                </span>
                            </span>
                        </div>

                        {/* Price */}
                        <div className="price-row mb-2">
                            <h3 className="netPrice text-danger mb-0">
                                {productData?.price
                                    ? `₹${productData.price}`
                                    : "—"}
                            </h3>
                            {productData?.oldPrice && (
                                <span className="oldPrice ms-3">
                                    ₹{productData.oldPrice}
                                </span>
                            )}
                        </div>
    
                        <span className="badge bg-success d-block">IN STOCK</span>

                        <p className="mt-3">{productData?.description}</p>
                        <div className="black-line"></div>
                        <button
                            className="btn-round btn-sml mt-3"
                            variant="outlined"
                            onClick={addToMyList}
                        >
                            <FaRegHeart /> &nbsp; Add to Wishlist
                        </button>
                        {/* Rating Section */}
                        <div className="rating-section mt-4">
                            <h5>Rate this product</h5>
                            <div className="d-flex align-items-center">
                                <Rating
                                    name="user-rating"
                                    value={tempRating}
                                    size="medium"
                                    precision={0.5}
                                    onChange={(event, newValue) => setTempRating(newValue)}
                                />
                                <span className="text-light cursor ms-2">
                                    {userRating > 0 ? `Your Rating: ${userRating}` : "Give a rating"}
                                </span>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mt-2"
                                onClick={submitRating}
                                disabled={tempRating === 0 || tempRating === userRating}
                            >
                                {userRating > 0 ? "Update Rating" : "Submit Rating"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;

// import ProductZoom from "../../Components/ProductZoom";
// import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';
// import { FaRegHeart } from "react-icons/fa6";
// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import { MyContext } from "../../App";
// import { fetchDataFromApi, postData } from "../../utils/api";

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [productData, setProductData] = useState({});
//     const [userRating, setUserRating] = useState(0);
//     const [tempRating, setTempRating] = useState(0);
//     const context = useContext(MyContext);

//     useEffect(() => {
//         context.setisFooterShow(false);
//         fetchDataFromApi(`/api/products/${id}`).then((res) => {
//             setProductData(res);

//             const user = JSON.parse(localStorage.getItem("user"));
//             if (user && user.userId && res.ratings) {
//                 const existingRating = res.ratings.find(
//                     (r) => r.userId === user.userId
//                 );
//                 if (existingRating) {
//                     setUserRating(existingRating.rating);
//                     setTempRating(existingRating.rating);
//                 }
//             }
//         });
//     }, [id, context]);

//     const addToMyList = () => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.userId) {
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: "You need to log in to add items to the wishlist!",
//             });
//             return;
//         }
//         const data = {
//             productTitle: productData?.name,
//             image: productData?.images?.[0] || "",
//             rating: parseFloat(productData?.rating || 0),
//             price: parseFloat(productData?.price || 0),
//             productId: id,
//             userId: user?.userId,
//         };
//         postData(`/api/my-list/add`, data)
//             .then((res) => {
//                 context.setAlertBox({
//                     open: true,
//                     error: !res.success,
//                     msg: res.message || "Added to Wishlist!",
//                 });
//             })
//             .catch(() => {
//                 context.setAlertBox({
//                     open: true,
//                     error: true,
//                     msg: "Error adding to Wishlist!",
//                 });
//             });
//     };

//     const submitRating = () => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.userId) {
//             context.setAlertBox({
//                 open: true,
//                 error: true,
//                 msg: "You need to log in to rate products!",
//             });
//             return;
//         }
//         const ratingData = { rating: tempRating };
//         postData(`/api/products/${id}/rate`, ratingData)
//             .then((res) => {
//                 if (res.success) {
//                     setUserRating(tempRating);
//                     context.setAlertBox({
//                         open: true,
//                         error: false,
//                         msg: "Thank you for your feedback!",
//                     });
//                     fetchDataFromApi(`/api/products/${id}`).then(
//                         (updatedRes) => {
//                             setProductData({ ...updatedRes });
//                         }
//                     );
//                     if (context.refreshProductList) {
//                         context.refreshProductList();
//                     }
//                 }
//             })
//             .catch(() => {
//                 context.setAlertBox({
//                     open: true,
//                     error: true,
//                     msg: "An error occurred while submitting your rating!",
//                 });
//             });
//     };

//     return (
//         <section className="productDetails section">
//             <div className="container">
//                 <div className="row">
//                     {/* Left Column: Product Image & Thumbnails */}
//                     <div className="col-md-6">
//                         <ProductZoom images={productData?.images} />
//                     </div>

//                     {/* Right Column: Product Info */}
//                     <div className="col-md-6">
//                         {/* Brand or store name, if needed */}
//                         <div className="mb-1 store-name">
//                             {productData?.storeName || "Benvmo grocery"}
//                         </div>

//                         {/* Product Title */}
//                         <h2 className="product-title mb-2">
//                             {productData?.name}
//                         </h2>

//                         {/* Rating & reviews */}
//                         <div className="rating d-flex align-items-center mb-2">
//                             <Rating
//                                 value={productData?.avgRating || 0}
//                                 precision={0.5}
//                                 readOnly
//                             />
//                             <span className="ms-2 text-muted">
//                                 {productData?.avgRating
//                                     ? productData.avgRating.toFixed(1)
//                                     : "No ratings yet"}{" "}
//                                 |{" "}
//                                 <span className="review-count">
//                                     {productData?.ratings?.length || 0}{" "}
//                                     Reviews
//                                 </span>
//                             </span>
//                         </div>

//                         {/* Price */}
//                         <div className="price-row mb-2">
//                             <h3 className="price mb-0">
//                                 {productData?.price
//                                     ? `₹${productData.price}`
//                                     : "—"}
//                             </h3>
//                             {productData?.oldPrice && (
//                                 <span className="old-price ms-3">
//                                     ₹{productData.oldPrice}
//                                 </span>
//                             )}
//                         </div>
//                         <div className="divider"></div>
//                         {/* Buttons: Add to basket, Buy now, Add to wishlist, Compare */}

//                         <Button
//                             className="btn-wishlist"
//                             onClick={addToMyList}
//                         >
//                             <FaRegHeart /> &nbsp; Wishlist
//                         </Button>


//                         {/* Badge or stock info */}
//                         {productData?.inStock && (
//                             <span className="badge bg-success d-inline-block mb-3">
//                                 In Stock
//                             </span>
//                         )}



//                         {/* Product Description */}
//                         {productData?.description && (
//                             <p className="product-description mb-3">
//                                 {productData.description}
//                             </p>
//                         )}

//                         {/* Rating submission section */}
//                         <div className="rating-section p-3">
//                             <h5 className="mb-3">Rate this product</h5>
//                             <div className="d-flex align-items-center mb-2">
//                                 <Rating
//                                     name="user-rating"
//                                     value={tempRating}
//                                     size="medium"
//                                     precision={0.5}
//                                     onChange={(event, newValue) =>
//                                         setTempRating(newValue)
//                                     }
//                                 />
//                                 <span className="text-muted ms-2">
//                                     {userRating > 0
//                                         ? `Your Rating: ${userRating}`
//                                         : "Give a rating"}
//                                 </span>
//                             </div>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={submitRating}
//                                 disabled={tempRating === 0 || tempRating === userRating}
//                             >
//                                 {userRating > 0
//                                     ? "Update Rating"
//                                     : "Submit Rating"}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ProductDetails;
