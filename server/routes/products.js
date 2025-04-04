

// //important
// import express from 'express';
// import pLimit from 'p-limit';
// import cloudinary from '../utils/cloudinary.js';
// import Product from '../models/products.js';

// const router = express.Router();
// const limit = pLimit(2);

// // Get all products
// // router.get('/', async (req, res) => {
// //     try {
// //         const page = parseInt(req.query.page) || 1;
// //         const perPage = 5;
// //         const totalPosts = await Product.countDocuments();
// //         const totalPages = Math.ceil(totalPosts / perPage);

// //         if (page > totalPages) {
// //             return res.status(404).json({ message: "Pages not found" });
// //         }

// //         const productList = await Product.find()
// //             .skip((page - 1) * perPage)
// //             .limit(perPage)
// //             .exec();

// //         return res.status(200).json({
// //             products: productList,
// //             totalPages: totalPages,
// //             page: page
// //         });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });


// router.get('/', async (req, res) => {
//     try {
//         const { page, viewAll } = req.query;

//         if (viewAll === "true") {
//             // Fetch all products when "View All" is requested
//             const productList = await Product.find();
//             return res.status(200).json({ products: productList });
//         }

//         // Default pagination logic
//         const currentPage = parseInt(page) || 1;
//         const perPage = 5;
//         const totalPosts = await Product.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (currentPage > totalPages) {
//             return res.status(404).json({ message: "Pages not found" });
//         }

//         const productList = await Product.find()
//             .skip((currentPage - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         return res.status(200).json({
//             products: productList,
//             totalPages: totalPages,
//             page: currentPage,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });




// // Create a new product
// router.post('/create', async (req, res) => {
//     try {
//         const imageToUpload = req.body.images.map((image) => {
//             return limit(async () => {
//                 const result = await cloudinary.uploader.upload(image);
//                 return result;
//             });
//         });

//         const uploadStatus = await Promise.all(imageToUpload);
//         const imgUrl = uploadStatus.map((item) => item.secure_url);

//         let product = new Product({
//             name: req.body.name,
//             description: req.body.description,
//             category: req.body.category,
//             images: imgUrl,
//             brand: req.body.brand,
//             price: req.body.price,
//             oldPrice: req.body.oldPrice,
//             barcode: req.body.barcode,
//             rating: req.body.rating,
//         });

//         product = await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message, success: false });
//     }
// });

// // Update a product
// router.put('/:id([0-9a-fA-F]{24})', async (req, res) => {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete a product
// router.delete('/:id([0-9a-fA-F]{24})', async (req, res) => {
//     try {
//         const deleteProduct = await Product.findByIdAndDelete(req.params.id);
//         if (!deleteProduct) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         res.status(200).json({ success: true, message: 'Product deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get product details by barcode
// router.get('/getProductDetails/:barcode', async (req, res) => {
//     try {
//         let barcode = req.params.barcode;
//         barcode = isNaN(barcode) ? barcode : Number(barcode);

//         const product = await Product.findOne({ barcode });
//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // 🔍 Search products (Place this BEFORE the GET /:id route)
// router.get('/search', async (req, res) => {
//     console.log("Full Query Params:", req.query);  // Debugging log

//     const query = req.query.query;
//     console.log("Search Route Hit with query:", query); // Debugging log

//     if (!query) {
//         return res.status(400).json({ error: "Search query is required" });
//     }

//     try {
//         const products = await Product.find({
//             name: { $regex: new RegExp(query, "i") } // Case-insensitive search
//         }).limit(10);

//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// // Get product by ID (Only matches valid ObjectIds)
// router.get('/:id([0-9a-fA-F]{24})', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;





import express from "express";
import pLimit from "p-limit";
import cloudinary from "../utils/cloudinary.js";
import Product from '../models/products.js';
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware for user authentication

const router = express.Router();
const limit = pLimit(2);

// ✅ GET: Fetch all products (Supports pagination & view all)
router.get("/", async (req, res) => {
    try {
        const { page, viewAll } = req.query;

        if (viewAll === "true") {
            const productList = await Product.find();
            return res.status(200).json({ products: productList });
        }

        const currentPage = parseInt(page) || 1;
        const perPage = 6;
        const totalPosts = await Product.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (currentPage > totalPages) {
            return res.status(404).json({ message: "Pages not found" });
        }

        const productList = await Product.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .exec();

        return res.status(200).json({
            products: productList,
            totalPages,
            page: currentPage,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ GET: Fetch a single product by ID (Includes dynamic rating)
router.get("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ 
            ...product.toObject(), 
            avgRating: product.avgRating // Return calculated average rating
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ POST: Create a new product
router.post("/create", async (req, res) => {
    try {
        const imageToUpload = req.body.images.map((image) => {
            return limit(async () => {
                const result = await cloudinary.uploader.upload(image);
                return result;
            });
        });

        const uploadStatus = await Promise.all(imageToUpload);
        const imgUrl = uploadStatus.map((item) => item.secure_url);

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            images: imgUrl,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            barcode: req.body.barcode,
        });

        product = await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

// ✅ PUT: Update a product
router.put("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ DELETE: Remove a product
router.delete("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ GET: Fetch product details by barcode
router.get("/getProductDetails/:barcode", async (req, res) => {
    try {
        let barcode = req.params.barcode;
        barcode = isNaN(barcode) ? barcode : Number(barcode);

        const product = await Product.findOne({ barcode });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET: Search products
router.get("/search", async (req, res) => {
    console.log("Full Query Params:", req.query);

    const query = req.query.query;
    console.log("Search Route Hit with query:", query);

    if (!query) {
        return res.status(400).json({ error: "Search query is required" });
    }

    try {
        const products = await Product.find({
            name: { $regex: new RegExp(query, "i") }
        }).limit(10);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ POST: Allow users to rate a product dynamically
router.post("/:id/rate", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const userId = req.user._id; // Get userId from authentication middleware

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if the user has already rated this product
        const existingRating = product.ratings.find(r => r.userId.toString() === userId.toString());

        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
        } else {
            // Add new rating
            product.ratings.push({ userId, rating });
        }

        await product.save();

        // Recalculate average rating
        const avgRating = product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length;

        return res.json({ success: true, message: "Rating submitted successfully", avgRating });
    } catch (error) {
        console.error("❌ Error submitting rating:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


export default router;
