const express = require("express");
const router = express.Router();

const {userSignup, userLogin, userLogout, deleteUserController, renewAuthToken} = require('../controllers/UserAuthorizationController');
const RequireUserLogin = require("../middlewares/RequireUserLogin");


router.post('/signup',userSignup);

router.post('/login',userLogin);

router.delete('/logout',RequireUserLogin,userLogout);

router.delete('/deleteuser/:id',RequireUserLogin,deleteUserController);

router.get('/refresh', renewAuthToken);

module.exports = router; 