const mongoose = require("mongoose"),
    productSchema = mongoose.Schema({
        product_id: Number,
        user_id: Number,
        title: String,
        description: Text,
        category: String,
        size: String,
        offer_type: String
    });
module.exports = mongoose.model("Product", productSchema);