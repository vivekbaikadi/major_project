import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: { type: String, default: "" },
    price: { type: String, default: "0" },
    oldPrice: { type: String, default: "0" },
    barcode: { type: String, required: true },

    // New Ratings Array (Stores individual user ratings)
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, min: 1, max: 5 }, // Ratings between 1 and 5
        },
    ],
});

// Virtual to Calculate Average Rating
productSchema.virtual("avgRating").get(function () {
    if (this.ratings.length === 0) return 0;
    const total = this.ratings.reduce((sum, r) => sum + r.rating, 0);
    return total / this.ratings.length;
});

productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
