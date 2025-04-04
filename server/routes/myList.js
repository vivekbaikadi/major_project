
import mongoose from 'mongoose';
import express from 'express';
import { MyList } from '../models/myList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const myList = await MyList.find({ userId });  
        return res.status(200).json(myList);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
});

router.post("/add", async (req, res) => {
    console.log("📥 Received Wishlist Request:", req.body);

    const { productTitle, image, rating, price, productId, userId } = req.body;

    if (!productTitle || !image || !rating || !price || !productId || !userId) {
        return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    try {
        const existingItem = await MyList.findOne({ productId, userId });

        if (existingItem) {
            return res.status(400).json({ success: false, message: "Product is already in the WishList!" });
        }

        const newWishlistItem = new MyList({
            productTitle,
            image,
            rating,
            price,
            productId,
            userId
        });

        await newWishlistItem.save();
        res.status(201).json({ success: true, message: "Item added to wishlist!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//         const item = await MyList.findById(req.params.id);

//         if (!item) {
//             return res.status(404).json({ success: false, message: "The item with the given ID was not found!" });
//         }

//         await MyList.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: 'Item Deleted!' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error deleting item" });
//     }
// });



router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    console.log("🗑️ Delete request received for ID:", id);

    // ✅ Check if ID is actually being received
    if (!id) {
        console.error("❌ No ID provided in request params!");
        return res.status(400).json({ success: false, message: "No ID provided!" });
    }

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid ObjectId format:", id);
        return res.status(400).json({ success: false, message: "Invalid ID format!" });
    }

    try {
        const item = await MyList.findById(id);
        
        // ✅ Check if item exists
        if (!item) {
            console.error("❌ Item not found in database:", id);
            return res.status(404).json({ success: false, message: "Item not found!" });
        }

        await MyList.findByIdAndDelete(id);
        console.log("✅ Item deleted successfully:", id);

        return res.status(200).json({ success: true, message: "Item deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting item:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});






router.get('/:id', async (req, res) => {
    try {
        const item = await MyList.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'The item with the given ID was not found' });
        }
        return res.status(200).send(item);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching item" });
    }
});

export default router;
