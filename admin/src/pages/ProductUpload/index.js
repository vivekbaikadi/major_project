// import React, { useContext, useRef, useState } from 'react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';



// import { postData } from '../../utils/api';
// import { MyContext } from '../../App';

// const ProductUpload = () => {
//     const context = useContext(MyContext);

//     const [ratingValue, setRatingValue] = useState(1);
//     const [barcode, setBarcode] = useState('');

//     const [productImagesArr, setproductImagesArr] = useState([]);

//     const [formFields, setformFields] = useState({
//         name: '',
//         description: '',
//         category: '',
//         images: [],
//         brand: '',
//         price: null,
//         oldPrice: null,
//         barcode: 0,
//         rating: 0,
//     })

//     const productImages = useRef();

//     const handleBarcodeChange = (event) => {
//         setBarcode(event.target.value);
//         setformFields(() => ({
//             ...formFields,
//             barcode: event.target.value
//         }))
//     }

//     const addProductImages = () => {
//         setproductImagesArr(prevArray => [...prevArray, productImages.current.value]);
//         productImages.current.value = "";
//     }

//     const inputChange = (e) => {
//         setformFields(() => ({
//             ...formFields,
//             [e.target.name]: e.target.value
//         }))
//     }

//     const addProduct = (e) => {
//         e.preventDefault();

//         formFields.images = productImagesArr

//         if(formFields.name===""){
//             context.setAlertBox({
//                 open:true,
//                 msg:'please add product name',
//                 error:true
//             });
//             return false;
//         }
//         if(formFields.description===""){
//             context.setAlertBox({
//                 open:true,
//                 msg:'please add product description',
//                 error:true
//             });
//             return false;
//         }
//         if(formFields.category===""){
//             context.setAlertBox({
//                 open:true,
//                 msg:'please add product category',
//                 error:true
//             });
//             return false;
//         }
//         if(formFields.barcode===""){
//             context.setAlertBox({
//                 open:true,
//                 msg:'please add product barcode',
//                 error:true
//             });
//             return false;
//         }

        

//         postData('/api/products/create', formFields).then((res) => {
//             context.setAlertBox({
//                 open: true,
//                 msg: 'the product is created!',
//                 error: false
//             });

//             setformFields({
//                 name: '',
//                 description: '',
//                 category: '',
//                 images: [],
//                 brand: '',
//                 price: '',
//                 oldPrice: '',
//                 barcode: '',
//                 rating: 0,
//             });
//             setBarcode('');
//             setproductImagesArr([]);
//         })
//     }

//     return (
//         <>
//             <div className="right-content w-100">
//                 <div className="heading shadow border-0 p-3 mt-1">
//                     <h3 className="hd">Product Upload</h3>
//                 </div>

//                 <form className='form' onSubmit={addProduct}>
//                     <div className="row">
//                         <div className="col-sm-9">
//                             <div className="card p-4">
//                                 <h5 className='mb-4'>Basic Information</h5>

//                                 <div className="form-group">
//                                     <h6>NAME</h6>
//                                     <input type="text" name='name' value={formFields.name} onChange={inputChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <h6>DESCRIPTION</h6>
//                                     <textarea rows={5} cols={10} name='description' value={formFields.description} onChange={inputChange} />
//                                 </div>

//                                 <div className='row'>
//                                     <div className='col'>
//                                         <div className='form-group'>
//                                             <h6>CATEGORY</h6>
//                                             <input type="text" className="form-control" name='category' value={formFields.category} onChange={inputChange} />
//                                         </div>
//                                     </div>

//                                     <div className='col'>
//                                         <div className='form-group'>
//                                             <h6>BRAND</h6>
//                                             <input type="text" className="form-control" name='brand' value={formFields.brand} onChange={inputChange} />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="row mt-4">
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <h6>PRICE</h6>
//                                             <input type="text" className="form-control" name='price' value={formFields.price} onChange={inputChange} />
//                                         </div>
//                                     </div>
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <h6>OLD PRICE</h6>
//                                             <input type="text" className="form-control" name='oldPrice' value={formFields.oldPrice} onChange={inputChange} />
//                                         </div>
//                                     </div>
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <h6>BARCODE</h6>
//                                             <input
//                                                 type="number"
//                                                 className="form-control"
//                                                 style={{
//                                                     '-webkit-appearance': 'none', /* for Chrome */
//                                                     '-moz-appearance': 'textfield' /* for Firefox */
//                                                 }}
//                                                 value={barcode}
//                                                 onChange={handleBarcodeChange}
//                                                 placeholder="Enter barcode"
//                                                 min="0"

//                                             />
//                                         </div>
//                                     </div>

//                                 </div>
//                                 <div className="row mt-4">
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <h6>IMAGES</h6>
//                                             <div className='position-relative inputBtn'>
//                                                 <input type="text" className="form-control" ref={productImages} name='images' onChange={inputChange} />
//                                                 <Button className='btn-blue' onClick={addProductImages}>Add</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row mt-4">
//                                     <div className="col">
//                                         <div className="form-group">
//                                             <h6>RATING</h6>
//                                             <Rating
//                                                 name="simple-controlled"
//                                                 value={ratingValue}
//                                                 onChange={(event, newValue) => {
//                                                     setRatingValue(newValue);
//                                                     setformFields(() => ({
//                                                         ...formFields,
//                                                         rating: newValue
//                                                     }))
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>


//                                 </div>

//                                 <br />

//                                 <Button type="submit" className='btn-blue btn-big' ><FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW</Button>
//                             </div>

//                         </div>

//                         <div className='col-sm-3'>
//                             <div className='stickyBox'>
//                                 {
//                                     productImagesArr?.length !== 0 &&
//                                     <h4>Product Images</h4>
//                                 }
//                                 <div className='imgGrid' id='imgGrid'>
//                                     {
//                                         productImagesArr?.map((image, index) => {
//                                             return (
//                                                 <div className='img' key={index}>
//                                                     <img src={image} alt='image' className='w-100' />
//                                                 </div>
//                                             )
//                                         })
//                                     }


//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default ProductUpload;




import React, { useContext, useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';

import { postData } from '../../utils/api';
import { MyContext } from '../../App';

const ProductUpload = () => {
    const context = useContext(MyContext);

    const [barcode, setBarcode] = useState('');
    const [productImagesArr, setproductImagesArr] = useState([]);

    const [formFields, setformFields] = useState({
        name: '',
        description: '',
        images: [],
        brand: '',
        price: null,
        oldPrice: null,
        barcode: 0,
    });

    const productImages = useRef();

    const handleBarcodeChange = (event) => {
        setBarcode(event.target.value);
        setformFields(() => ({
            ...formFields,
            barcode: event.target.value
        }));
    };

    const addProductImages = () => {
        setproductImagesArr(prevArray => [...prevArray, productImages.current.value]);
        productImages.current.value = "";
    };

    const inputChange = (e) => {
        setformFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }));
    };

    const addProduct = (e) => {
        e.preventDefault();

        formFields.images = productImagesArr;

        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                msg: 'Please add product name',
                error: true
            });
            return false;
        }
        if (formFields.description === "") {
            context.setAlertBox({
                open: true,
                msg: 'Please add product description',
                error: true
            });
            return false;
        }
        if (formFields.barcode === "") {
            context.setAlertBox({
                open: true,
                msg: 'Please add product barcode',
                error: true
            });
            return false;
        }

        postData('/api/products/create', formFields).then((res) => {
            context.setAlertBox({
                open: true,
                msg: 'The product is created!',
                error: false
            });

            setformFields({
                name: '',
                description: '',
                images: [],
                brand: '',
                price: '',
                oldPrice: '',
                barcode: '',
            });
            setBarcode('');
            setproductImagesArr([]);
        });
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="heading shadow border-0 p-3 mt-1">
                    <h3 className="hd">Product Upload</h3>
                </div>

                <form className='form' onSubmit={addProduct}>
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="card p-4">
                                <h5 className='mb-4'>Basic Information</h5>

                                <div className="form-group">
                                    <h6>NAME</h6>
                                    <input type="text" name='name' value={formFields.name} onChange={inputChange} />
                                </div>
                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} name='description' value={formFields.description} onChange={inputChange} />
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>BRAND</h6>
                                            <input type="text" className="form-control" name='brand' value={formFields.brand} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRICE</h6>
                                            <input type="text" className="form-control" name='price' value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>OLD PRICE</h6>
                                            <input type="text" className="form-control" name='oldPrice' value={formFields.oldPrice} onChange={inputChange} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>BARCODE</h6>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={barcode}
                                                onChange={handleBarcodeChange}
                                                placeholder="Enter barcode"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>IMAGES</h6>
                                            <div className='position-relative inputBtn'>
                                                <input type="text" className="form-control" ref={productImages} name='images' onChange={inputChange} />
                                                <Button className='btn-blue' onClick={addProductImages}>Add</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <Button type="submit" className='btn-blue btn-big'>
                                    <FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW
                                </Button>
                            </div>
                        </div>

                        <div className='col-sm-3'>
                            <div className='stickyBox'>
                                {productImagesArr?.length !== 0 && <h4>Product Images</h4>}
                                <div className='imgGrid' id='imgGrid'>
                                    {productImagesArr?.map((image, index) => (
                                        <div className='img' key={index}>
                                            <img src={image} alt='image' className='w-100' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductUpload;
