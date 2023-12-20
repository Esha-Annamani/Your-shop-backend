const { getOrderByIdService, getAllOrdersService, placeOrderService, cancelOrderService} =  require('../services/OrderServices')
const {getProductByIdService} = require('../services/ProductServices')
const {getAddressByIdService} = require('../services/AddressServices')

const getAllOrdersController = async(req,res) =>{
   try{
      const orders = await getAllOrdersService(req.session.user)
      if (orders.length===0) {
         return res.status(404).json({ error: "You have not placed any orders" });
      }
      res.status(200).json(orders)
   }catch(err){
      res.status(500).json({error:err.message})
   }
}

const getOrderByIdController = async(req,res) =>{
    try{
       const order = await getOrderByIdService(req.params.id,req.session.user)
       if (!order) {
          return res.status(404).json({ error: "Order not found" });
       }
       res.status(200).json(order)
    }catch(err){
       res.status(500).json({error:err.message})
    }
 }

const placeOrderController = async(req,res) =>{
   try{
        const product = await getProductByIdService(req.body.product, req.session.user);

        if(!product) {
            return res.status(404).send("Product not found");
        }

        const address = await getAddressByIdService(req.body.address, req.session.user);
        if(!address) {
            return res.status(404).send('Address not found');
        }

        if(product.availableItems < req.body.quantity) {
            return res.status(404).send(`Product is out of stock. Available items ${product.availableItems}`);
        }
        const placedOrder = await placeOrderService(req.body,req.session.user)
        res.status(201).json({order:placedOrder,message:"Order placed Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}

const cancelOrderController = async(req,res) =>{
    try{
        const cancelledOrder = await cancelOrderService(req.params.id, req.session.user)
        if (!cancelledOrder) {
           return res.status(404).json({ error: "Order not found" });
        }
        res.status(204).json({message:"Order cancelled Successfully"})
     }catch(err){
        res.status(500).json({error:err.message})
     }
}

module.exports = {
    getAllOrdersController,
    getOrderByIdController,
    placeOrderController, 
    cancelOrderController 
}