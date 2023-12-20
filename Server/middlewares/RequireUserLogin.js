const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = mongoose.model("User")


const RequireUserLogin = (req, res, next) => {
    const accessToken = req.session.accessToken
    const refreshToken = req.session.refreshToken
  
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (error, decodedRefreshToken) => {
            if (error) {
                return res.status(401).json({ message: 'Refresh Token Expired' });
            };
            jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (error, decodedAccessToken)=>{
                if (error) {
                    return res.status(403).json({ message: 'Access Token Expired' });
                };
                User.findOne({ email: decodedAccessToken.email })
                .then((user) => {
                    if (!user) {
                        return res.status(401).json({ message: 'Access denied. User authorization required. Login...' });
                    }
                    req.session.user = user; 
                    next();
                })
                .catch((err) => {
                    return res.status(500).json({ message: 'Server error' });
                });
            })
        })
    
    } catch (err) {
    return res.status(422).json({ message: err.message });
    }
}
module.exports = RequireUserLogin;