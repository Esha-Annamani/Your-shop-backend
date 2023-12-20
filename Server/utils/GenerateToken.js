const jwt = require('jsonwebtoken');

  // Function to generate a access token
function generateAccessToken(user) {
    return jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
  }
  
  // Function to generate a refresh token
  function generateRefreshToken(user) {
    return jwt.sign({ email: user.email, role: user.role }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
  }

  module.exports={
    generateAccessToken,
    generateRefreshToken
  }