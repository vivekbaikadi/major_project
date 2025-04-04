

import express from "express";
import Payment from "../models/Payment.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Import authentication middleware

const router = express.Router();

// ✅ Get User Payment History (Protected Route)
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from middleware
        const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

        if (!payments.length) {
            return res.status(404).json({ success: false, message: "No payment history found." });
        }

        res.json({ success: true, payments });
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
