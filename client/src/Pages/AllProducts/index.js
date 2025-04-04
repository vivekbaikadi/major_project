import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../../../client/src/utils/api";
import ProductItem from "../../Components/ProductItem";
import { useContext } from "react";
import { MyContext } from "../../App";
const AllProducts = () => {
    const [productList, setProductList] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const viewAll = searchParams.get("viewAll");
    const context = useContext(MyContext);

    useEffect(() => {
        context.setisHeaderShow(true);
        const endpoint = viewAll === "true" ? "/api/products?viewAll=true" : "/api/products";
        fetchDataFromApi(endpoint).then((res) => {
            setProductList(res.products);
        });
    }, [viewAll]);

    return (
        <div className="container" style={{marginTop:"100px"}}>
            <h2 className="mb-4">All Products</h2>
            <div className="row">
                {productList.length > 0 ? (
                    productList.map((item, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <ProductItem item={item} />
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
