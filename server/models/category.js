// const mongoose = require('mongoose');

// const categorySchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     }
    

// })
// exports.Category = mongoose.model('Category',categorySchema)




// Import mongoose
import mongoose from 'mongoose';

// Define the schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Export the model
export const Category = mongoose.model('Category', categorySchema);
