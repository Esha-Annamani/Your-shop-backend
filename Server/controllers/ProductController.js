const {addProductService, getProductByIdService, getAllProductsService, updateProductByIdService, deleteProductByIdService} = require('../services/ProductServices');

const getAllProductsController = async(req,res) =>{
   try{
      const products = await getAllProductsService()
      if (products.length===0) {
         return res.status(404).json({ error: "Products not found" });
      }
      res.status(200).json(products)
   }catch(err){
      res.status(500).json({error:err.message})
   }
}

const getProductByIdController = async(req,res) =>{
   try{
      const product = await getProductByIdService(req.params.id)
      if (!product) {
         return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product)
   }catch(err){
      res.status(500).json({error:err.message})
   }
}
const addProductController = async(req,res) =>{
   try{
      const insertedProduct = await addProductService(req.body, req.session.user)
      res.status(201).json({product:insertedProduct,message:"Product Added Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}
const updateProductByIdController = async(req,res) =>{
   try{
      const updatedProduct = await updateProductByIdService(req.params.id, req.body, req.session.user)
      if (!updatedProduct) {
         return res.status(404).json({ error: "Product not found" });
      }
      res.status(201).json({message:"Product Updated  Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}

const deleteProductByIdController = async(req,res) =>{
   try{
      const deletedProduct = await deleteProductByIdService(req.params.id, req.session.user)
      if (!deletedProduct) {
         return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).json({message:"Product Deleted Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
}

module.exports = {
   addProductController, 
   getProductByIdController, 
   getAllProductsController, 
   deleteProductByIdController,
   updateProductByIdController
}