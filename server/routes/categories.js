// const {Category} =require('../models/category');
// const express = require('express');
// const router = express.Router();

// router.get(`/`, async(req,res) => {
//     const categoryList = await Category.find();

//     if(!categoryList)
//     {
//         res.status(500).json({ success: false})
//     }
//     res.send(categoryList);
// });

// module.exports = router;



// Import statements
import express from 'express';
import { Category } from '../models/category.js';  // Use .js extension for ES modules

// Initialize router
const router = express.Router();

// Define the GET route
router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find();
        
        if (!categoryList) {
            return res.status(500).json({ success: false });
        }
        res.send(categoryList);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/create', async (req, res) => {
    const limit = pLimit(2);
    const imagesToUpload = req.body.images.map((image)=> {
        return limit(async () => {
            const result = await clodinary.uploader.upload(image);
            return result;
        })
    });

    const uploadStatus = await Promise.all(imagesToUpload);

    const imgUrl = uploadStatus.map((item) => {
        return item.secure_url
    })

    if(!uploadStatus){
        return res.status(500).json({
            error:"images cannot upload",
            status:false
        })
    }

    let category = new Category({
        name:req.body.name
    });

    if(!category){
        res.status(500).json({
            error: err,
            success: false
        })
    }

    category = await category.save();
    res.status(201).json(category);
})

// Export the router
export default router;
