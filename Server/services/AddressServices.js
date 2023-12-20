const mongoose = require("mongoose")
const Address = mongoose.model("Address")

const addAddressService = async (newAddress,addressUser) => {
    try{
        if(newAddress.user.toString() != addressUser._id.toString()){
            throw new Error("You don't have permission to add address ")
        }
        const address = new Address(newAddress);
        const data = await address.save(); 
        return data;
    }catch(err){
        throw new Error(err)
    }
}

const getAllAddressService = async (addressUser) => {
    try{
        const addresses = await Address.find({ user: addressUser._id })
        .populate("user", "_id username email")
        .sort("-createdAt")
        return addresses
    }catch(err){
        throw new Error(err)
    }
}

const getAddressByIdService = async (id,addressUser) => {
    try{
        const address = await Address.findById(id)
        if (addressUser._id.toString() != address.user.toString()){
            throw new Error("Access Denied. You cannot get this address")
        }
        return address
    }catch(err){
        throw new Error(err)
    }
}

const updateAddressService = async (id, updateAddress, addressUser) => {

    try {
        let address = await Address.findById(id);
        if(!address) {
            throw new Error("Address not found");
        }

        if (addressUser._id.toString() != address.user.toString() || addressUser._id.toString() != updateAddress.user.toString()){
            throw new Error("Access Denied. You cannot update address")
        }
        
        const updatedAddress = await Address.findByIdAndUpdate(id, updateAddress);
        return updatedAddress; 
    }  catch(err) {
       throw new Error(err);
    }
    
}

const deleteAddressService = async (id, addressUser) => {
    try {
        const address = await Address.findById(id)
        if(address){
            if (addressUser._id.toString() !== address.user.toString()){
                throw new Error("You cannot delete this address")
            }
        } 
        const deletedAddress = await Address.findByIdAndDelete(id);
        return deletedAddress      
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = {
    getAllAddressService,
    getAddressByIdService, 
    addAddressService, 
    updateAddressService, 
    deleteAddressService
}