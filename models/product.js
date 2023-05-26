const mongoose = require("mongoose"),
    productSchema = mongoose.Schema({
        product_id: String,
        user_id: String,
        title: String,
        description: String,
        category: String,
        size: String,
        offer_type: String
    });
module.exports = mongoose.model("Product", productSchema);
