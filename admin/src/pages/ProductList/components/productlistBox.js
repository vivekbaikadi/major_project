
// const ProductListBox = (props) => {

//     return (
//         <div className="dashboardBox" style={{
//             backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
//         }}>
//             <div className="d-flex w-100">
//                 <div className="col1">
//                     <h4 className="text-white mb-0">Total Products</h4>
//                     <span className="text-white">277</span>
//                 </div>

//                 <div className="ml-auto" style={{ marginLeft: 'auto' }}>
//                     {
//                         props.icon ?
//                             <span className="icon">{props.icon ? props.icon : ''}</span>
//                             :
//                             ''
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductListBox;


import React from "react";

const ProductListBox = ({ title, value, color, icon }) => {
    return (
        <div
            className="dashboardBox"
            style={{
                backgroundImage: `linear-gradient(to right, ${color?.[0]}, ${color?.[1]})`,
            }}
        >
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white mb-0">{title}</h4>
                    <span className="text-white">{value}</span>
                </div>
                <div className="ml-auto" style={{ marginLeft: 'auto' }}>
                    {icon && (
                        <div className="icon">
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListBox;
