const mongoose = require("mongoose")
const Address = mongoose.model("Address")
const Product = mongoose.model("Product")
const Order = mongoose.model("Order")
const User = mongoose.model("User")
const  Account = mongoose.model("Account")


const {getAccountBalanceService, updateAccountBalanceService} = require('../services/AccountServices')


const placeOrderService = async (order,user) => {
    try{
        if(order.user.toString() != user._id.toString()){
            throw new Error("You don't have permission to place order")
        }      
        try {
            const account = await Account.findOne({user: order.user})
            if(!account){
                throw new Error("Create wallet account to place order")
            }
            const product = await Product.findById(order.product);
            if(account.balance<product.price*order.quantity){
                throw new Error("Insufficient balance in your wallet")
            }
            account.balance-=product.price*order.quantity
            const updatedAccount=await account.save()
            product.availableItems -= +order.quantity;
            const updatedProduct = await product.save();
            const newOrder = new Order(order);
            const savedOrder = await newOrder.save();
            return savedOrder;
        } catch(err) {
            throw new Error(err) 
        }
    }catch(err){
        throw new Error(err)
    }
}   

const getAllOrdersService = async (user) => {
    try{
        const orders = await Order.find({ user: user._id })
        .populate("user", "_id username email")
        .sort("-createdAt")
        return orders
    }catch(err){
        throw new Error(err)
    }
}

const getOrderByIdService = async (id,user) => {
    try{
        const order = await Order.findById(id)
        if (user._id.toString() != order.user.toString()){
            throw new Error("Access Denied. You cannot get this order")
        }
        return order
    }catch(err){
        throw new Error(err)
    }
}

const cancelOrderService = async (id, user) => {
    try {
        const order = await Order.findById(id)
        if(order){
            if (user._id.toString() !== order.user.toString()){
                throw new Error("You cannot delete this order")
            }
        }
        const account = await Account.findOne({user: order.user})
            if(!account){
                throw new Error("Create wallet account to place order")
            }
        const product = await Product.findById(order.product);
        account.balance+=product.price*order.quantity
        const updatedAccount=await account.save()
        product.availableItems += +order.quantity;
        const updatedProduct = await product.save();
        const cancelledOrder = await Order.findByIdAndDelete(id);
        return cancelledOrder     
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = {
    getOrderByIdService,
    getAllOrdersService,
    placeOrderService, 
    cancelOrderService
}