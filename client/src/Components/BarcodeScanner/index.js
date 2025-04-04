



// Actual code
// import React, { useState, useEffect } from 'react';
// import Quagga from 'quagga';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import { AiOutlineCamera } from 'react-icons/ai';

// const BarcodeScanner = ({ addToCart, cart, setCart }) => {
//   const [barcode, setBarcode] = useState('');
//   const [product, setProduct] = useState({ name: 'Unknown Product', price: 0.0 });
//   const [scannedBarcodes, setScannedBarcodes] = useState(new Set());
//   const [scanning, setScanning] = useState(false);
//   const [viewingCart, setViewingCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [showQuantityInput, setShowQuantityInput] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false); // State for managing dialog visibility

//   useEffect(() => {
//     if (scanning) {
//       // Quagga.init({
//       //   inputStream: {
//       //     type: 'LiveStream',
//       //     constraints: {
//       //       width: 640,
//       //       height: 480,
//       //       facingMode: 'environment'
//       //     },
//       //     target: document.querySelector('#cameraFeed')
//       //   },
//       //   decoder: {
//       //     readers: ['ean_reader', 'code_128_reader']
//       //   }
//       // }, (err) => {
//       //   if (err) {
//       //     console.error(err);
//       //     return;
//       //   }
//       //   console.log('Barcode scanner initialized');
//       //   Quagga.start();
//       // });


//       Quagga.init(
//         {
//           inputStream: {
//             type: "LiveStream",
//             constraints: {
//               width: 640,
//               height: 480,
//               facingMode: "environment",
//             },
//             target: document.querySelector("#cameraFeed"),
//           },
//           decoder: {
//             readers: ["ean_reader", "code_128_reader"], // Supports common barcode formats
//           },
//           locate: true, // Helps locate barcodes more accurately
//         },
//         (err) => {
//           if (err) {
//             console.error("Quagga Initialization Error:", err);
//             return;
//           }
//           console.log("Barcode scanner initialized successfully!");
//           Quagga.start();
//         }
//       );


//       // Quagga.onDetected((data) => {
//       //   const detectedBarcode = data.codeResult.code;

//       //   if (!scannedBarcodes.has(detectedBarcode)) {
//       //     setBarcode(detectedBarcode);
//       //     const productInfo = lookupProduct(detectedBarcode);

//       //     if (productInfo.name !== 'Unknown Product') {
//       //       setProduct(productInfo);
//       //       setShowQuantityInput(true);
//       //       setScannedBarcodes((prev) => new Set(prev).add(detectedBarcode));
//       //       setOpenDialog(true); // Open the dialog when a product is detected
//       //     } else {
//       //       setShowQuantityInput(false);
//       //     }
//       //   }
//       // });


//       Quagga.onDetected(async (data) => {
//         const detectedBarcode = data.codeResult.code;

//         if (!scannedBarcodes.has(detectedBarcode)) {
//           setBarcode(detectedBarcode);

//           const productInfo = await lookupProduct(detectedBarcode);

//           if (productInfo.name !== 'Unknown Product') {
//             setProduct(productInfo);
//             setScannedBarcodes((prev) => new Set(prev).add(detectedBarcode));

//             // Add the item to cart immediately
//             addToCart({ ...productInfo, quantity: 1, totalPrice: productInfo.price, barcode });
//           }
//         }
//       });



//       return () => {
//         Quagga.stop();
//         Quagga.offDetected();
//       };
//     }
//   }, [scanning, scannedBarcodes]);

//   const lookupProduct = async (barcode) => {
//     try {
//       // const response = await fetch(`http://localhost:4000/api/products/getProductDetails?barcode=${barcode}`);

//       const response = await fetch(`http://localhost:4000/api/products/getProductDetails/${encodeURIComponent(barcode)}`);


//       const data = await response.json();

//       if (response.ok) {
//         return {
//           name: data.name,
//           price: parseFloat(data.price) || 0.0  // Ensure price is a valid number
//         };
//       } else {
//         return { name: 'Unknown Product', price: 0.0 };
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       return { name: 'Unknown Product', price: 0.0 };
//     }
//   };





//   const startScanning = () => setScanning(true);

//   const stopScanning = () => {
//     Quagga.stop();
//     setScanning(false);
//     setScannedBarcodes(new Set());
//     setShowQuantityInput(false);
//   };

//   const handleAddToCart = () => {
//     if (product.name !== 'Unknown Product') {
//       const totalPrice = product.price * quantity;
//       addToCart({ ...product, quantity, totalPrice, barcode });
//       setShowQuantityInput(false);
//       setQuantity(1);
//       setProduct({ name: 'Unknown Product', price: 0.0 });
//       setOpenDialog(false); // Close the dialog after adding to cart
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

//   const removeFromCart = (index) => {
//     const itemToRemove = cart[index];
//     setCart((prevCart) => prevCart.filter((_, i) => i !== index));
//     setScannedBarcodes((prev) => {
//       const updatedScanned = new Set(prev);
//       updatedScanned.delete(itemToRemove.barcode);
//       return updatedScanned;
//     });
//   };

//   const handleCloseDialog = () => setOpenDialog(false);

//   return (
//     <div className="scanner-container" style={{ textAlign: 'center', margin: '20px' }}>
//       <Button
//         onClick={startScanning}
//         variant="contained"
//         color="primary"
//         startIcon={<AiOutlineCamera />}
//         style={{ marginBottom: '20px' }}
//       >
//         Scan Something
//       </Button>

//       {scanning && (
//         <>
//           <div id="cameraFeed" style={{ width: '100%', height: '480px', marginLeft: '320px' }}></div>
//           <Button
//             onClick={stopScanning}
//             variant="contained"
//             color="secondary"
//             style={{ margin: '20px 0px 20px 0px' }}
//           >
//             Stop Scanning
//           </Button>
//         </>
//       )}

//       {/* Modal for Product Details */}
//       <Modal
//         open={openDialog}
//         onClose={handleCloseDialog}
//         aria-labelledby="product-dialog-title"
//         aria-describedby="product-dialog-description"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: '10px'
//         }}>
//           <h2 id="product-dialog-title">Product Details</h2>
//           {product.name !== 'Unknown Product' && (
//             <>
//               <p>Product Name: {product.name}</p>
//               <p>Product Price: ₹{product.price.toFixed(2)}</p>
//               <h4>Select Quantity:</h4>
//               <Button onClick={decreaseQuantity}>-</Button>
//               <span style={{ margin: '0 10px' }}>{quantity}</span>
//               <Button onClick={increaseQuantity}>+</Button>
//               <div style={{ marginTop: '20px' }}>
//                 <Button
//                   onClick={handleAddToCart}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Add to Cart
//                 </Button>
//               </div>
//             </>
//           )}
//           {product.name === 'Unknown Product' && (
//             <p>Unknown Product</p>
//           )}
//         </Box>
//       </Modal>
//       <br></br>
//       <Button
//         onClick={() => setViewingCart((prev) => !prev)}
//         variant="contained"
//         color="secondary"
//       >
//         {viewingCart ? 'Hide Cart' : 'View Cart'}
//       </Button>

//       {viewingCart && (
//         <div className="cartView" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
//           <h2>Shopping Cart</h2>
//           {cart.length === 0 ? (
//             <p>No items in the cart.</p>
//           ) : (
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Product</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Price</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Quantity</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Total Price</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item, index) => (
//                   <tr key={index}>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>{item.name}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>₹{parseFloat(item.price).toFixed(2)}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>
//                       ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                     </td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => removeFromCart(index)}
//                       >
//                         Remove
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarcodeScanner;





//changed code
// import React, { useState, useEffect } from 'react';
// import Quagga from 'quagga';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import { AiOutlineCamera } from 'react-icons/ai';

// const BarcodeScanner = ({ addToCart, cart, setCart }) => {
//   const [barcode, setBarcode] = useState('');
//   const [product, setProduct] = useState({ name: 'Unknown Product', price: 0.0 });
//   const [scannedBarcodes, setScannedBarcodes] = useState(new Set());
//   const [scanning, setScanning] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [viewingCart, setViewingCart] = useState(false);

//   useEffect(() => {
//     if (scanning) {
//       Quagga.init(
//         {
//           inputStream: {
//             type: 'LiveStream',
//             constraints: { width: 640, height: 480, facingMode: 'environment' },
//             target: document.querySelector('#cameraFeed'),
//           },
//           decoder: { readers: ['ean_reader', 'code_128_reader'] },
//           locate: true,
//         },
//         (err) => {
//           if (err) {
//             console.error('Quagga Initialization Error:', err);
//             return;
//           }
//           console.log('Barcode scanner initialized successfully!');
//           Quagga.start();
//         }
//       );

//       Quagga.onDetected(async (data) => {
//         const detectedBarcode = data.codeResult.code;

//         if (!scannedBarcodes.has(detectedBarcode)) {
//           setBarcode(detectedBarcode);
//           const productInfo = await lookupProduct(detectedBarcode);

//           if (productInfo.name !== 'Unknown Product') {
//             setProduct(productInfo);
//             setScannedBarcodes((prev) => new Set(prev).add(detectedBarcode));
//             setOpenDialog(true);
//             stopScanning(); // Stop scanning after detecting one item
//           }
//         }
//       });

//       return () => {
//         Quagga.stop();
//         Quagga.offDetected();
//       };
//     }
//   }, [scanning, scannedBarcodes]);

//   const lookupProduct = async (barcode) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/products/getProductDetails/${encodeURIComponent(barcode)}`);
//       const data = await response.json();

//       if (response.ok) {
//         return { name: data.name, price: parseFloat(data.price) || 0.0 };
//       } else {
//         return { name: 'Unknown Product', price: 0.0 };
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       return { name: 'Unknown Product', price: 0.0 };
//     }
//   };

//   const startScanning = () => setScanning(true);
//   const stopScanning = () => {
//     Quagga.stop();
//     setScanning(false);
//   };

//   const handleAddToCart = () => {
//     if (product.name !== 'Unknown Product') {
//       const totalPrice = product.price * quantity;
//       addToCart({ ...product, quantity, totalPrice, barcode });
//       setScannedBarcodes((prev) => new Set(prev).add(barcode));
//       setOpenDialog(false);
//       setQuantity(1);
//       setProduct({ name: 'Unknown Product', price: 0.0 });
//     }
//   };

//   const removeFromCart = (index) => {
//     const itemToRemove = cart[index];
//     setCart((prevCart) => prevCart.filter((_, i) => i !== index));
//     setScannedBarcodes((prev) => {
//       const updatedScanned = new Set(prev);
//       updatedScanned.delete(itemToRemove.barcode);
//       return updatedScanned;
//     });
//   };

//   return (
//     <div className="scanner-container" style={{ textAlign: 'center', margin: '20px' }}>
//       <Button
//         onClick={startScanning}
//         variant="contained"
//         color="primary"
//         startIcon={<AiOutlineCamera />}
//         style={{ marginBottom: '20px' }}
//       >
//         Start Scan
//       </Button>

//       {scanning && (
//         <>
//           <div id="cameraFeed" style={{ width: '100%', height: '480px', marginLeft: '320px' }}></div>
//           <Button onClick={stopScanning} variant="contained" color="secondary" style={{ margin: '20px 0' }}>
//             Stop Scanning
//           </Button>
//         </>
//       )}

//       {/* Product Details Modal */}
//       <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
//         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: '10px' }}>
//           <h2>Product Details</h2>
//           {product.name !== 'Unknown Product' ? (
//             <>
//               <p>Name: {product.name}</p>
//               <p>Price: ₹{product.price.toFixed(2)}</p>
//               <h4>Select Quantity:</h4>
//               <Button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</Button>
//               <span style={{ margin: '0 10px' }}>{quantity}</span>
//               <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
//               <div style={{ marginTop: '20px' }}>
//                 <Button onClick={handleAddToCart} variant="contained" color="primary">
//                   Add to Cart
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <p>Unknown Product</p>
//           )}
//         </Box>
//       </Modal>

//       <br />

//       <Button onClick={() => setViewingCart((prev) => !prev)} variant="contained" color="secondary">
//         {viewingCart ? 'Hide Cart' : 'View Cart'}
//       </Button>

//       {viewingCart && (
//         <div className="cartView" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
//           <h2>Shopping Cart</h2>
//           {cart.length === 0 ? (
//             <p>No items in the cart.</p>
//           ) : (
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Product</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Price</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Quantity</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Total Price</th>
//                   <th style={{ borderBottom: '1px solid #ddd' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item, index) => (
//                   <tr key={index}>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>{item.name}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>₹{parseFloat(item.price).toFixed(2)}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>
//                       ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                     </td>
//                     <td style={{ borderBottom: '1px solid #ddd' }}>
//                       <Button variant="contained" color="error" onClick={() => removeFromCart(index)}>
//                         Remove
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarcodeScanner;




//changed the changed code

import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { AiOutlineCamera } from 'react-icons/ai';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Explicit import
import { postData } from "../../utils/api";


const BarcodeScanner = ({ addToCart, cart, setCart }) => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState({ name: 'Unknown Product', price: 0.0 });
  const [scannedBarcodes, setScannedBarcodes] = useState(new Set());
  const [scanning, setScanning] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewingCart, setViewingCart] = useState(false);


  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);


  useEffect(() => {
    if (scanning) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            constraints: { width: 640, height: 480, facingMode: 'environment' },
            target: document.querySelector('#cameraFeed'),
          },
          decoder: { readers: ['ean_reader', 'code_128_reader'] },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Quagga Initialization Error:', err);
            return;
          }
          Quagga.start();
        }
      );

      const handleDetected = async (data) => {
        const detectedBarcode = data.codeResult.code;
        if (!scannedBarcodes.has(detectedBarcode)) {
          setBarcode(detectedBarcode);
          setScannedBarcodes((prev) => new Set(prev).add(detectedBarcode));

          const productInfo = await lookupProduct(detectedBarcode);
          if (productInfo.name !== 'Unknown Product') {
            setProduct(productInfo);
            setOpenDialog(true);
          }
        }
      };

      Quagga.onDetected(handleDetected);

      return () => {
        Quagga.offDetected(handleDetected);
        Quagga.stop();
      };
    }
  }, [scanning, scannedBarcodes]);


  const lookupProduct = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/getProductDetails/${encodeURIComponent(barcode)}`);
      const data = await response.json();

      if (response.ok) {
        return { name: data.name, price: parseFloat(data.price) || 0.0 };
      } else {
        return { name: 'Unknown Product', price: 0.0 };
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      return { name: 'Unknown Product', price: 0.0 };
    }
  };

  const startScanning = () => setScanning(true);
  const stopScanning = () => {
    Quagga.stop();
    setScanning(false);
  };

  const handleAddToCart = () => {
    if (product.name !== 'Unknown Product') {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.barcode === barcode);
        if (existingIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += quantity;
          updatedCart[existingIndex].totalPrice += product.price * quantity;
          return updatedCart;
        } else {
          return [...prevCart, { ...product, quantity, totalPrice: product.price * quantity, barcode }];
        }
      });

      setScannedBarcodes((prev) => new Set([...prev, barcode]));
      setOpenDialog(false);
      setQuantity(1);
      setProduct({ name: 'Unknown Product', price: 0.0 });
    }
  };


  const removeFromCart = (index) => {
    const itemToRemove = cart[index];
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    setScannedBarcodes((prev) => {
      const updatedScanned = new Set(prev);
      updatedScanned.delete(itemToRemove.barcode);
      return updatedScanned;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/payment/create-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ amount: getTotalPrice() * 100 }) // Convert to paise
  //     });

  //     const data = await response.json();

  //     if (!data.id) {
  //       throw new Error("Failed to create Razorpay order");
  //     }

  //     // ✅ Load Razorpay SDK dynamically
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.async = true;
  //     script.onload = () => launchRazorpay(data); // Call Razorpay only after script loads
  //     document.body.appendChild(script);
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //   }
  // };

  // const launchRazorpay = (data) => {
  //   const options = {
  //     key: 'rzp_test_0BfVmdsHalUces', // ✅ Fetch from .env
  //     amount: data.amount,
  //     currency: "INR",
  //     order_id: data.id,
  //     handler: async function (response) {
  //       const verifyResponse = await fetch("http://localhost:4000/api/payment/verify-payment", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature
  //         })
  //       });

  //       const verifyData = await verifyResponse.json();
  //       if (verifyData.success) {
  //         alert("Payment successful!");
  //         setCart([]); // ✅ Clear cart after successful payment
  //       } else {
  //         alert("Payment verification failed.");
  //       }
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         console.log("Payment popup closed.");
  //       }
  //     }
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  const handlePayment = async () => {
    const token = localStorage.getItem("token"); // ✅ Retrieve token

    console.log("🔍 Retrieved Token:", token); // ✅ Debug token before sending

    if (!token) {
      console.error("🚨 No token found. Please log in.");
      alert("You must be logged in to make a payment.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Ensure token is sent
        },
        body: JSON.stringify({ amount: getTotalPrice() }) // ✅ Ensure amount is correct
      });

      console.log("📌 Sent Headers:", {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });

      const data = await response.json();
      console.log("🔹 API Response:", data); // ✅ Debug API response

      if (!data.id) throw new Error("Failed to create Razorpay order");

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => launchRazorpay(data, [...cart], setCart);
      document.body.appendChild(script);
    } catch (error) {
      console.error("❌ Error initiating payment:", error);
    }
  };




  // const launchRazorpay = (data) => {
  //   const options = {
  //     key: 'rzp_test_0BfVmdsHalUces', // Fetch from environment variable
  //     amount: data.amount,
  //     currency: "INR",
  //     order_id: data.id,
  //     handler: async function (response) {
  //       const verifyResponse = await fetch("http://localhost:4000/api/payment/verify-payment", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //           cartItems: cart // Send cart data to backend
  //         })
  //       });

  //       const verifyData = await verifyResponse.json();
  //       if (verifyData.success) {
  //         alert("Payment successful!");
  //         localStorage.removeItem("cart"); // ✅ Clear cart after payment
  //         setCart([]); // ✅ Reset cart
  //         generateBill(); // ✅ Generate bill
  //       } else {
  //         alert("Payment verification failed.");
  //       }
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         console.log("Payment popup closed.");
  //       }
  //     }
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  // // ✅ Function to generate bill
  // const generateBill = () => {
  //   let billContent = "Receipt\n\n";
  //   cart.forEach(item => {
  //     billContent += `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.totalPrice}\n`;
  //   });
  //   billContent += `\nTotal: ₹${getTotalPrice()}`;

  //   const billWindow = window.open("", "_blank");
  //   billWindow.document.write(`<pre>${billContent}</pre>`);
  //   billWindow.document.close();
  // };


  const generateBill = (cart) => {
    if (!cart || cart.length === 0) {
      console.error("Cart is empty or undefined.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Supermarket Bill", 20, 10);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 20);

    // Table headers and rows
    const headers = [["Product", "Price (₹)", "Quantity", "Total (₹)"]];
    const data = cart.map(item => [
      item.name,
      item.price.toFixed(2),
      item.quantity,
      (item.price * item.quantity).toFixed(2)
    ]);

    // Ensure autoTable is properly called
    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
    });

    // Get the final position of the table
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 40;

    doc.text(
      `Total Amount: ₹${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`,
      20,
      finalY + 10
    );

    doc.save("Supermarket_Bill.pdf");
  };

  //important
  // const launchRazorpay = (data, cart, setCart) => {
  //   const options = {
  //     key: "rzp_test_0BfVmdsHalUces", // ✅ Fetch from .env
  //     amount: data.amount,
  //     currency: "INR",
  //     order_id: data.id,
  //     handler: async function (response) {
  //       const verifyResponse = await fetch("http://localhost:4000/api/payment/verify-payment", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //           cartItems: cart,
  //         }),
  //       });

  //       const verifyData = await verifyResponse.json();
  //       if (verifyData.success) {
  //         alert("Payment successful!");
  //         generateBill([...cart]); // ✅ Generate bill
  //         localStorage.removeItem("cart"); // ✅ Clear cart
  //         setCart([]); // ✅ Reset cart state
  //       } else {
  //         alert("Payment verification failed.");
  //       }
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         console.log("Payment popup closed.");
  //       },
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };


  // const launchRazorpay = (data, cart, setCart) => {
  //   const options = {
  //     key: "rzp_test_0BfVmdsHalUces", // ✅ Fetch from .env
  //     amount: data.amount,
  //     currency: "INR",
  //     order_id: data.id,
  //     handler: async function (response) {
  //       const verifyData = await postData("/api/payment/verify-payment", {
  //         razorpay_order_id: response.razorpay_order_id,
  //         razorpay_payment_id: response.razorpay_payment_id,
  //         razorpay_signature: response.razorpay_signature,
  //         cartItems: cart,
  //       });

  //       if (verifyData.success) {
  //         alert("Payment successful!");
  //         generateBill([...cart]); // ✅ Generate bill
  //         localStorage.removeItem("cart"); // ✅ Clear cart
  //         setCart([]); // ✅ Reset cart state
  //       } else {
  //         alert("Payment verification failed.");
  //       }
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         console.log("Payment popup closed.");
  //       },
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };


  const launchRazorpay = (data, cart, setCart) => {
    const options = {
        key: process.env.RAZORPAY_KEY_ID, // ✅ Use .env key
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        handler: async function (response) {
            const verifyData = await postData("/api/payment/verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: cart,
            });

            if (verifyData.success) {
                alert("Payment successful!");
                generateBill([...cart]); // ✅ Generate bill
                localStorage.removeItem("cart"); // ✅ Clear cart
                setCart([]); // ✅ Reset cart state
            } else {
                alert("Payment verification failed.");
            }
        },
        modal: {
            ondismiss: function () {
                console.log("Payment popup closed.");
            },
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};


  return (
    <div className="scanner-container" style={{ textAlign: 'center', margin: '100px 20px' }}>
      <Button
        onClick={startScanning}
        variant="contained"
        color="primary"
        startIcon={<AiOutlineCamera />}
        style={{ marginBottom: '20px' }}
      >
        Start Scan
      </Button>

      {scanning && (
        <>
          <div id="cameraFeed" style={{ width: '100%', height: '480px', marginLeft: '320px' }}></div>
          <Button onClick={stopScanning} variant="contained" color="secondary" style={{ margin: '20px 0' }}>
            Stop Scanning
          </Button>
        </>
      )}

      {/* Product Details Modal */}
      <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: '10px' }}>
          <h2>Product Details</h2>
          {product.name !== 'Unknown Product' ? (
            <>
              <p>Name: {product.name}</p>
              <p>Price: ₹{product.price.toFixed(2)}</p>
              <h4>Select Quantity:</h4>
              <Button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</Button>
              <span style={{ margin: '0 10px' }}>{quantity}</span>
              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
              <div style={{ marginTop: '20px' }}>
                <Button onClick={handleAddToCart} variant="contained" color="primary">
                  Add to Cart
                </Button>
              </div>
            </>
          ) : (
            <p>Unknown Product</p>
          )}
        </Box>
      </Modal>

      <br />

      <Button onClick={() => setViewingCart((prev) => !prev)} variant="contained" color="secondary">
        {viewingCart ? 'Hide Cart' : 'View Cart'}
      </Button>

      {viewingCart && (
        <div className="cartView" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ddd' }}>Product</th>
                    <th style={{ borderBottom: '1px solid #ddd' }}>Price</th>
                    <th style={{ borderBottom: '1px solid #ddd' }}>Quantity</th>
                    <th style={{ borderBottom: '1px solid #ddd' }}>Total Price</th>
                    <th style={{ borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td style={{ borderBottom: '1px solid #ddd' }}>{item.name}</td>
                      <td style={{ borderBottom: '1px solid #ddd' }}>₹{parseFloat(item.price).toFixed(2)}</td>
                      <td style={{ borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
                      <td style={{ borderBottom: '1px solid #ddd' }}>
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                      <td style={{ borderBottom: '1px solid #ddd' }}>
                        <Button variant="contained" color="error" onClick={() => removeFromCart(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Wrap adjacent elements in a fragment */}
              <>
                <h3>Total Price: ₹{getTotalPrice()}</h3>
                <Button onClick={handlePayment} variant="contained" color="success" disabled={cart.length === 0}>
                  Proceed to Payment
                </Button>
              </>
            </>
          )}
        </div>
      )}

    </div >
  );
};

export default BarcodeScanner;
