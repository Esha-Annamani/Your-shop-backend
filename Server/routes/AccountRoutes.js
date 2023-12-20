const express = require("express");
const router = express.Router();

const {getAccountBalanceController, createAccountController, updateAccountBalanceController} = require('../controllers/AccountController');
const RequireUserLogin = require("../middlewares/RequireUserLogin");


router.get('/getaccountbalance/:id', RequireUserLogin, getAccountBalanceController);

router.post('/createaccount', RequireUserLogin, createAccountController);

router.put('/updateaccountbalance/:id',RequireUserLogin, updateAccountBalanceController);


module.exports = router; 