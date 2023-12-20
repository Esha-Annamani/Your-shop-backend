const express = require("express");
const router = express.Router();

const {getAllAddressController, getAddressByIdController,addAddressController, updateAddressController, deleteAddressController} = require('../controllers/AddressController');
const RequireUserLogin = require("../middlewares/RequireUserLogin");


router.get('/getaddresses', RequireUserLogin, getAllAddressController);

router.get('/getaddress/:id',RequireUserLogin, getAddressByIdController);

router.post('/addaddress', RequireUserLogin, addAddressController);

router.put('/updateaddress/:id',RequireUserLogin, updateAddressController);

router.delete('/deleteaddress/:id', RequireUserLogin, deleteAddressController);

module.exports = router; 