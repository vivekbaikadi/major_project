// import React from 'react';

// const CartView = ({ cart, setCart }) => {
//   const updateQuantity = (index, newQuantity) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       updatedCart[index].quantity = newQuantity > 0 ? newQuantity : 1;
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (index) => {
//     setCart((prevCart) => prevCart.filter((_, i) => i !== index));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className='cartView'>
//       <h2>Shopping Cart</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody id="cart-items">
//           {cart.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>₹{item.price.toFixed(2)}</td>
//               <td>
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
//                 />
//               </td>
//               <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//               <td>
//                 <button onClick={() => removeFromCart(index)}>Remove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3>Total in INR: ₹{calculateTotal().toFixed(2)}</h3>
//     </div>
//   );
// };

// export default CartView;



// import React from 'react';

// const CartView = ({ cart, setCart }) => {
// //   const updateQuantity = (index, newQuantity) => {
// //     setCart((prevCart) => {
// //       const updatedCart = [...prevCart];
// //       updatedCart[index].quantity = newQuantity > 0 ? newQuantity : 1; // Prevent setting quantity to less than 1
// //       return updatedCart;
// //     });
// //   };

//   const removeFromCart = (index) => {
//     setCart((prevCart) => prevCart.filter((_, i) => i !== index));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleAddQuantity = (index) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       updatedCart[index].quantity += 1; // Increase the quantity by 1
//       return updatedCart;
//     });
//   };

//   const handleSubtractQuantity = (index) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart];
//       if (updatedCart[index].quantity > 1) {
//         updatedCart[index].quantity -= 1; // Decrease the quantity by 1, but not below 1
//       }
//       return updatedCart;
//     });
//   };

//   return (
//     <div className='cartView'>
//       <h2>Shopping Cart</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody id="cart-items">
//           {cart.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>₹{item.price.toFixed(2)}</td>
//               <td>
//                 {/* Display quantity as 1, but allow users to increase/decrease it */}
//                 <button onClick={() => handleSubtractQuantity(index)}>-</button>
//                 <span>{item.quantity === 1 ? 1 : item.quantity}</span>
//                 <button onClick={() => handleAddQuantity(index)}>+</button>
//               </td>
//               <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//               <td>
//                 <button onClick={() => removeFromCart(index)}>Remove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3>Total in INR: ₹{calculateTotal().toFixed(2)}</h3>
//     </div>
//   );
// };

// export default CartView;







import React from 'react';

const CartView = ({ cart = [], setCart }) => {
    const updateQuantity = (index, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart[index].quantity = 1;
            return updatedCart;
        });
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='cartView'>
            <h2>Shopping Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="cart-items">
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                />
                            </td>
                            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => removeFromCart(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total in INR: ₹{calculateTotal().toFixed(2)}</h3>
        </div>
    );
};

export default CartView;
