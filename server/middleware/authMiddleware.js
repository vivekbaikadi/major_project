// import jwt from "jsonwebtoken";
// import User from "../models/User.js"; // Make sure you have a User model

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization")?.split(" ")[1]; // Extract token from request headers

//         if (!token) {
//             return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
//         }

//         // Verify the token using JWT_SECRET
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.id).select("-password"); // Attach user data to request (excluding password)

//         if (!req.user) {
//             return res.status(401).json({ success: false, message: "User not found" });
//         }

//         next(); // Proceed to the next middleware or route
//     } catch (error) {
//         res.status(401).json({ success: false, message: "Invalid token" });
//     }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Ensure correct import

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("📌 Received Auth Header:", authHeader); // Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("🚫 No token provided or incorrect format");
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔍 Extracted Token:", token); // Debug extracted token

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        console.log("✅ Token Decoded:", decoded); // Debug decoded token

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            console.error("🚫 Token valid but user not found in DB");
            return res.status(401).json({ success: false, message: "Invalid token: User not found" });
        }

        console.log("✅ User Authenticated:", req.user.email); // Debug successful authentication
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
