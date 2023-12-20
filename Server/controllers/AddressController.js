const {getAllAddressService, getAddressByIdService, addAddressService, updateAddressService, deleteAddressService} = require('../services/AddressServices');

const getAllAddressController = async(req,res) =>{
   try{
      const addresses = await getAllAddressService(req.session.user)
      if (addresses.length===0) {
         return res.status(404).json({ error: "No added address found for user" });
      }
      res.status(200).json(addresses)
   }catch(err){
      res.status(500).json({error:err.message})
   }
}

const getAddressByIdController = async(req,res) =>{
    try{
       const address = await getAddressByIdService(req.params.id,req.session.user)
       if (!address) {
          return res.status(404).json({ error: "Address not found" });
       }
       res.status(200).json(address)
    }catch(err){
       res.status(500).json({error:err.message})
    }
 }

const addAddressController = async(req,res) =>{
   try{
      const newAddress=req.body
      const insertedAddress = await addAddressService(newAddress,req.session.user)
      res.status(201).json({address:insertedAddress,message:"Address Added Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}
const updateAddressController = async(req,res) =>{
   try{
      const updatedAddress = await updateAddressService(req.params.id, req.body, req.session.user)
      if (!updatedAddress) {
         return res.status(404).json({ error: "Address not found" });
      }
      res.status(201).json({message:"Address Updated  Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}

const deleteAddressController = async(req,res) =>{
    try{
        const deletedAddress = await deleteAddressService(req.params.id, req.session.user)
        if (!deletedAddress) {
           return res.status(404).json({ error: "Address not found" });
        }
        res.status(204).json({message:"Address Deleted Successfully"})
     }catch(err){
        res.status(500).json({error:err.message})
     }
}

module.exports = {
    getAllAddressController,
    getAddressByIdController, 
    addAddressController, 
    updateAddressController, 
    deleteAddressController
}