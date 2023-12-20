const express = require("express");
const router = express.Router();

const {addProductController, getProductByIdController, getAllProductsController, updateProductByIdController, deleteProductByIdController} = require('../controllers/ProductController');
const RequireAdminLogin = require("../middlewares/RequireAdminLogin");


router.get('/getproducts', getAllProductsController);

router.get('/getproduct/:id', getProductByIdController);

router.post('/addproduct',RequireAdminLogin,addProductController);

router.put('/updateproduct/:id',RequireAdminLogin,updateProductByIdController)

router.delete('/deleteproduct/:id', RequireAdminLogin, deleteProductByIdController);

module.exports = router; 