// import ProductListBox from "./components/productlistBox";
// import { MdInterests } from "react-icons/md";

// import { FaBagShopping } from "react-icons/fa6";

// import { useContext, useEffect, useState } from "react";
// import Button from '@mui/material/Button';
// import { FaPen } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import { MyContext } from '../../App';

// import Pagination from '@mui/material/Pagination';
// import { deleteData, fetchDataFromApi } from "../../utils/api";


// const ProductList = () => {

//     const context = useContext(MyContext);



//     const [ProductList, setproductList] = useState([]);

//     useEffect(() => {
//         fetchDataFromApi("/api/products").then((res) => {
//             setproductList(res)
//         })
//     }, []);

//     const deleteProduct = (id)=>{
//         deleteData(`/api/products/${id}`).then((res)=>{
//             context.setAlertBox({
//                 open:true,
//                 error:true,
//                 msg:'Product Deleted'
//             });
//             fetchDataFromApi("/api/products").then((res) => {
//                 setproductList(res)
//             })
//         })
//     }

//     const handleChange = (event, value) =>{
//         fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
//             setproductList(res)
//         })
//     }

//     return (
//         <>
//             <div className="right-content w-100">
//                 <div className="heading shadow border-0 p-3 mt-1">
//                     <h3 className="hd">Product List</h3>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="productlistboxWrapper d-flex">
//                             <ProductListBox color={["#1da256", "#48d483"]} icon={<FaBagShopping />} />
//                             <ProductListBox color={["#c012e2", "#eb64fe"]} icon={<MdInterests />} />
//                             <ProductListBox color={["#2c78e5", "#60aff5"]} icon={<FaBagShopping />} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="card shadow border-0 p-3 mt-4">
//                     <h3 className="hd">Best Selling Products</h3>



//                     <div className="table-responsive mt-3">
//                         <table className="table table-bordered v-align">
//                             <thead className="thead-dark">
//                                 <tr>
//                                     <th>UID</th>
//                                     <th>PRODUCT</th>
//                                     <th>CATEGORY</th>
//                                     <th>BRAND</th>
//                                     <th>PRICE</th>
//                                     <th>RATING</th>
//                                     <th>ACTION</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     ProductList?.products?.length !== 0 && ProductList?.products?.map((item, index) => {
//                                         return (
//                                             <tr>
//                                                 <td>#1</td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center productBox">
//                                                         <div className="imgWrapper">
//                                                             <div className="img">
//                                                                 <img src={item.images[0]} className="w-100" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="info">
//                                                             <h6>{item.name}</h6>
//                                                             <p>{item.description}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>{item.category}</td>
//                                                 <td>{item.brand}</td>
//                                                 <td>
//                                                     <del className="oldPrice">INR {item.oldPrice}</del>
//                                                     <span className="text-danger netPrice">INR {item.price}</span>
//                                                 </td>
//                                                 <td>{item.rating}</td>
//                                                 <td>
//                                                     <div className="actions d-flex align-items-center" style={{ width: '50px' }}>
//                                                         <Button color="success"><FaPen /></Button>
//                                                         <Button color="error" onClick={()=>deleteProduct(item.id)} ><MdDelete /></Button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                 }


//                             </tbody>
//                         </table>

//                         <div className="d-flex tableFooter">
//                             {/* <p>showing <b>12</b> of <b>60</b> results</p> */}
//                             <Pagination count={ProductList?.totalPages} color="primary" className="pagination" onChange={handleChange}/>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </>
//     )
// }

// export default ProductList;


import { useContext, useEffect, useState, useCallback } from "react";  // ✅ Add useCallback
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import ProductListBox from "../ProductList/components/productlistBox";
import axios from "axios";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";


const ProductList = () => {
    const context = useContext(MyContext);
    const [ProductList, setProductList] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPayments: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/stats");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();
    }, []);

    // ✅ Function to re-fetch product list
    const refreshData = useCallback(() => {
        console.log("Fetching updated product list..."); // Debugging log
        fetchDataFromApi("/api/products").then((res) => {
            setProductList(res);
        });
    }, []);

    useEffect(() => {
        refreshData();
        // ✅ Store refresh function in context so other components can trigger it
        context.refreshProductList = refreshData;
    }, [refreshData]);

    const deleteProduct = (id) => {
        deleteData(`/api/products/${id}`).then(() => {
            context.setAlertBox({ open: true, error: true, msg: "Product Deleted" });
            refreshData(); // ✅ Re-fetch product list after deletion
        });
    };

    const handleChange = (event, value) => {
        fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
            setProductList(res);
        });
    };

    return (
        <div className="right-content w-100">
            <div className="heading shadow border-0 p-3 mt-1">
                <h3 className="hd">Product List</h3>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="productlistboxWrapper d-flex">
                        <ProductListBox
                            title="Total Users"
                            value={stats.totalUsers}
                            color={["#1da256", "#48d483"]}
                            icon={<FaUsers />}
                        />
                        <ProductListBox
                            title="Total Payments"
                            value={stats.totalPayments}
                            color={["#c012e2", "#eb64fe"]}
                            icon={<FaShoppingCart />}
                        />
                        <ProductListBox
                            title="Total Revenue"
                            value={`₹${stats.totalRevenue}`}
                            color={["#2c78e5", "#60aff5"]}
                            icon={<FaRupeeSign />}
                        />
                        {/* <ProductListBox color={["#1da256", "#48d483"]} icon={<FaBagShopping />} />
                        <ProductListBox color={["#c012e2", "#eb64fe"]} icon={<MdInterests />} />
                        <ProductListBox color={["#2c78e5", "#60aff5"]} icon={<FaBagShopping />} /> */}
                    </div>
                </div>
            </div>

            <div className="card shadow border-0 p-3 mt-4">

                <div className="table-responsive mt-3">
                    <table className="table table-bordered v-align">
                        <thead className="thead-dark">
                            <tr>
                                <th>UID</th>
                                <th>PRODUCT</th>
                                <th>BRAND</th>
                                <th>PRICE</th>
                                <th>RATING</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProductList?.products?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>#{index + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img">
                                                    <img
                                                        src={item.images.length > 0 ? item.images[0] : "default-image.jpg"}
                                                        className="w-100"
                                                        alt={item.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="info">
                                                <h6>{item.name}</h6>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <del className="oldPrice">INR {item.oldPrice}</del>
                                        <span className="text-danger netPrice">INR {item.price}</span>
                                    </td>
                                    <td>{item.avgRating ? item.avgRating.toFixed(1) : "No ratings yet"}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center" style={{ width: "50px" }}>
                                            <Button color="success"><FaPen /></Button>
                                            <Button color="error" onClick={() => deleteProduct(item.id)}><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex tableFooter">
                        <Pagination count={ProductList?.totalPages} color="primary" className="pagination" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
