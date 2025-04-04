

//main code

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Rating } from "@mui/material";

const MyList = () => {
    const [myListData, setMyListData] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisFooterShow(false);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        if (!user?.userId) {
            console.error("❌ No userId found in local storage!");
            return;
        }
    
        fetchDataFromApi(`/api/my-list?userId=${user.userId}`)
            .then((res) => {
                console.log("📝 Wishlist API Response:", res);  // Log response
                setMyListData(res);
            })
            .catch((err) => console.error("❌ API Fetch Error:", err));
    }, []);
    

    // const removeItem = (id) => {
    //     deleteData(`api/my-list/${id}`).then((res) => {
    //         context.setAlertBox({
    //             open: true,
    //             error: false,
    //             msg: "Item removed from WishList!"
    //         });

    //         const user = JSON.parse(localStorage.getItem("user"));
    //         fetchDataFromApi(`api/my-list?userId=${user?.userId}`).then((res) => {
    //             setMyListData(res);
    //         });
    //     });
    // };

    const removeItem = (id) => {
        if (!id) {
            console.error("❌ No ID provided for delete!");
            return;
        }
    
        console.log("🗑️ Attempting to delete item with ID:", id);
    
        deleteData(`/api/my-list/${id}`)
            .then((res) => {
                console.log("🚀 DELETE Response:", res);
    
                if (res?.success) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Item removed from WishList!"
                    });
    
                    const user = JSON.parse(localStorage.getItem("user"));
                    fetchDataFromApi(`/api/my-list?userId=${user?.userId}`)
                        .then((res) => setMyListData(res));
                } else {
                    console.error("❌ Error deleting item:", res);
                }
            })
            .catch((err) => console.error("❌ DELETE Request Failed:", err));
    };
    
    
    


    return (
        <section className="cartPage">
            <div className="container">
                <h2 className="hd mb-1">WishList</h2>
                <p>There are <b className="text-red">{myListData?.length}</b> products in your WishList</p>

                {myListData?.length > 0 ? (
                    <table className="wishlist-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myListData.map((item, index) => {
                                return (
                                    <tr>
                                        <td>

                                            <div className="d-flex align-items-center">
                                                <Link to={`/product/${item?.productId}`}>
                                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                                        <img src={item?.image} className="w-100" alt="item?.productTitle" />
                                                    </div>
                                                </Link>

                                                <div className="info px-3">
                                                    <h6>
                                                        {item?.productTitle?.substr(0, 30) + '...'}
                                                    </h6>
                                                    <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                </div>
                                            </div>


                                        </td>
                                        <td>Rs {item?.price}</td>
                                        <td>
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}
                                        </td>

                                        <td>
                                            <button className="remove-btn" onClick={() => removeItem(item?._id)}>REMOVE</button>
                                        </td>
                                    </tr>
                                )
                            }

                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </section>
    );
};

export default MyList;



