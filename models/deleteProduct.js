const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

class deleteProduct {
    constructor(){}

    async deleteProduct(userId, productId){
        // check if user exists
        const user = await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }

        // check if product exists and belongs to user
        const product = await Product.findOne({ _id: productId, user: userId });
        if(!product){
            throw new Error('Product not found or you are not the owner of the product');
        }

        // delete the product
        await Product.deleteOne({ _id: productId });
        console.log('Product deleted successfully');
    }
}

module.exports = deleteProduct;
