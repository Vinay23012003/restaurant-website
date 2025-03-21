const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Starter", "Burgers", "Main Course", "Dessert", "Breakfast",
            "Pizza", "Beverages", "Fast Food", "Italian", "Chinese", "Indian",
            "Mexican", "Japanese", "Thai", "Mediterranean", "Vegan", "Seafood", "BBQ"
        ],
        required: true
    },
    image: {
        type: [String], // ✅ Array of image URLs
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length > 0; 
            },
            message: "At least one image is required."
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Menu", MenuSchema);
