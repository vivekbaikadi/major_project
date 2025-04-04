// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema({
//   orderId: { type: String, required: true },
//   paymentId: { type: String },
//   signature: { type: String },
//   amount: { type: Number, required: true },
//   currency: { type: String, default: "INR" },
//   status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// const Payment = mongoose.model("Payment", PaymentSchema);
// export default Payment;


import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Link to User
  orderId: { type: String, required: true },
  paymentId: { type: String },
  signature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },

  // ✅ Storing cart items in MongoDB
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    }
  ]
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
