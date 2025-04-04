

// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import Payment from "../models/Payment.js"; // Import Payment model
// import authMiddleware  from "../middleware/authMiddleware.js";


// dotenv.config();
// const router = express.Router();

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });



// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const userId = req.user._id; // ✅ Extract userId from authenticated request

//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     // Store order details in MongoDB with userId
//     const payment = new Payment({
//       userId, // ✅ Include userId
//       orderId: order.id,
//       amount,
//       status: "Pending",
//     });

//     await payment.save();

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });




// // Verify Payment

// //this is imp
// // router.post("/verify-payment", authMiddleware, async (req, res) => {
// //   try {
// //       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;

// //       const generated_signature = crypto
// //           .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //           .update(razorpay_order_id + "|" + razorpay_payment_id)
// //           .digest("hex");

// //       if (generated_signature === razorpay_signature) {
// //           const payment = new Payment({
// //               orderId: razorpay_order_id,
// //               paymentId: razorpay_payment_id,
// //               signature: razorpay_signature,
// //               amount: cartItems.reduce((acc, item) => acc + item.totalPrice, 0),
// //               currency: "INR",
// //               status: "Paid",
// //               items: cartItems
// //           });

// //           await payment.save();

// //           res.json({ success: true, message: "Payment verified successfully!" });
// //       } else {
// //           res.status(400).json({ success: false, message: "Payment verification failed!" });
// //       }
// //   } catch (error) {
// //       res.status(500).json({ error: error.message });
// //   }
// // });


// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;

//       const generated_signature = crypto
//           .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//           .update(razorpay_order_id + "|" + razorpay_payment_id)
//           .digest("hex");

//       if (generated_signature === razorpay_signature) {
//           const payment = new Payment({
//               userId: req.user._id, // ✅ Include userId
//               orderId: razorpay_order_id,
//               paymentId: razorpay_payment_id,
//               signature: razorpay_signature,
//               amount: cartItems.reduce((acc, item) => acc + item.totalPrice, 0),
//               currency: "INR",
//               status: "Paid",
//               items: cartItems
//           });

//           await payment.save();

//           res.json({ success: true, message: "Payment verified successfully!" });
//       } else {
//           res.status(400).json({ success: false, message: "Payment verification failed!" });
//       }
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });





// export default router;




import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Payment from "../models/Payment.js"; // Import Payment model
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order API
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id; // ✅ Extract userId from authenticated request

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Store order details in MongoDB with "Pending" status
    await Payment.create({
      userId,
      orderId: order.id,
      amount,
      currency: "INR",
      status: "Pending",
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Verify Payment API (Fix: Update Existing Entry Instead of Creating Duplicate)
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = req.body;

    // Generate signature for validation
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // ✅ Find the existing "Pending" payment entry
      const payment = await Payment.findOne({ orderId: razorpay_order_id });

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment record not found" });
      }

      // ✅ Update payment details instead of creating a duplicate entry
      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      payment.status = "Paid";
      payment.items = cartItems;
      await payment.save();

      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

