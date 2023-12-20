const express = require("express");
const router = express.Router();

const {getAllOrdersController, getOrderByIdController, placeOrderController, cancelOrderController} = require('../controllers/OrderController');
const RequireUserLogin = require("../middlewares/RequireUserLogin");

router.get('/getallorders', RequireUserLogin, getAllOrdersController);

router.get('/getorder/:id', RequireUserLogin, getOrderByIdController);

router.post('/placeorder', RequireUserLogin, placeOrderController);

router.delete('/cancelorder/:id', RequireUserLogin, cancelOrderController);


module.exports = router; 