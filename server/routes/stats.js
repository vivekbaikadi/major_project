import express from "express";
import User from "../models/user.js";
import Payment from "../models/Payment.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // ✅ Total number of users
        const totalUsers = await User.countDocuments();

        // ✅ Total number of successful payments
        const totalPayments = await Payment.countDocuments({ status: "Paid" });

        // ✅ Total revenue (sum of successful payments)
        const totalRevenueData = await Payment.aggregate([
            { $match: { status: "Paid" } },  // Only count paid transactions
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;

        res.json({
            totalUsers,
            totalPayments,
            totalRevenue
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
