

// import Rating from '@mui/material/Rating';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

// const ProductItem = (props) => {


//     const navigate = useNavigate();

//     const handleProductClick = () => {
//         navigate(`/product/${props?.item?.id}`);
//     };


//     return (
//         <>
//             <div className="item productItem">
//                 <div className="imgWrapper">
//                     <img
//                         src={props.item?.images[0]}
//                         className="w-100"
//                         alt=''
//                         onClick={handleProductClick}
//                     />

//                 </div>
//                 <div className="info">
//                     <h4 style={{ cursor: 'pointer', color: 'black' }} onClick={handleProductClick}>
//                         {props?.item?.name?.substr(0, 30)}
//                     </h4>

//                     <span className="text-success d-block">IN STOCK</span>
//                     <Rating
//                         className="mt-2 mb-2"
//                         name="read-only"
//                         value={props?.item?.rating}
//                         readOnly
//                         size="small"
//                         precision={0.5}
//                     />
//                     <div className="d-flex">
//                         <span className="oldPrice">INR {props?.item?.oldPrice}</span>
//                         <span className="netPrice text-danger ">INR {props?.item?.price}</span>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default ProductItem;






// import Rating from '@mui/material/Rating';
// import { useNavigate } from "react-router-dom";

// const ProductItem = (props) => {
//     const navigate = useNavigate();

//     const handleProductClick = () => {
//         navigate(`/product/${props?.item?.id}`);
//     };

//     return (
//         <div className="item productItem">
//             <div className="imgWrapper">
//                 <img
//                     src={props.item?.images[0]}
//                     className="w-100"
//                     alt=""
//                     onClick={handleProductClick}
//                 />
//             </div>
//             <div className="info">
//                 <h4 
//                     style={{ cursor: 'pointer', color: 'black' }} 
//                     onClick={handleProductClick}
//                 >
//                     {props?.item?.name?.substr(0, 30)}
//                 </h4>

//                 <span className="text-success d-block">IN STOCK</span>

//                 {/* ✅ Update to use avgRating */}
//                 <Rating
//                     className="mt-2 mb-2"
//                     name="read-only"
//                     value={props?.item?.avgRating || 0}  // Use avgRating
//                     readOnly
//                     size="small"
//                     precision={0.5}
//                 />
//                 <span className="text-muted">
//                     ({props?.item?.avgRating ? props.item.avgRating.toFixed(1) : "No ratings yet"})
//                 </span>

//                 <div className="d-flex">
//                     <span className="oldPrice">INR {props?.item?.oldPrice}</span>
//                     <span className="netPrice text-danger">INR {props?.item?.price}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductItem;




import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { FaRegHeart } from "react-icons/fa6";

const ProductItem = ({ item }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${item?.id}`);
    };

    return (
        <div className="product-card">
            <div className="product-image" onClick={handleProductClick}>
                <img src={item?.images[0]} alt={item?.name} />
            </div>
            <div className="product-info">
                <h4 className="product-name" onClick={handleProductClick}>{item?.name?.substr(0, 30)}</h4>
                <Rating name="read-only" value={item?.avgRating || 0} readOnly size="small" precision={0.5} />
                <span className="rating-text">({item?.avgRating ? item.avgRating.toFixed(1) : "No ratings yet"})</span>
                <div className="price-section">
                    <span className="old-price">INR {item?.oldPrice}</span>
                    <span className="new-price">INR {item?.price}</span>
                </div>
                <button className="add-to-cart">Add to WishList &nbsp;
                    <FaRegHeart />
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
