const mongoose = require("mongoose")
const Product = mongoose.model("Product")

const addProductService = async (newProduct, user) => {
    try{
        if (!newProduct.soldBy || user._id.toString() != newProduct.soldBy.toString()){
            throw new Error("User Id and Seller Id does not match")
        }
        const product = new Product(newProduct);
        const data = await product.save(); 
        return data;
    }catch(err){
        throw new Error(err)
    }
}

const getAllProductsService = async () => {
    try{
        const products = await Product.find()
        .populate("soldBy", "_id username email")
        .sort("-createdAt")
        return products
    }catch(err){
        throw new Error(err)
    }
}

const getProductByIdService = async (id) => {
    try{
        const product = await Product.findById(id)
        .populate("soldBy", "_id username email")
        return product
    }catch(err){
        throw new Error(err)
    }
}

const updateProductByIdService = async (id, updateProduct, user) => {

    try {
        let product = await Product.findById(id);
        if(!product) {
            throw new Error("Product not found");
        }

        if (user._id.toString() != product.soldBy.toString() || user._id.toString() != updateProduct.soldBy){
            // console.log(user._id,product._id,updateProduct.soldBy)
            throw new Error("Access Denied. You cannot update product")
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(id, updateProduct);
        return updatedProduct; 
    }  catch(err) {
       throw new Error(err);
    }
    
}

const deleteProductByIdService = async (id,user) => {
    try {
        const product = await Product.findById(id)
        if(product){
            if (user._id.toString() !== product.soldBy.toString()){
                throw new Error("You cannot delete this product")
            }
        } 
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct      
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = {
    addProductService, 
    getProductByIdService, 
    getAllProductsService, 
    updateProductByIdService,
    deleteProductByIdService
}