const mongoose = require("mongoose")
const User = mongoose.model("User")
const Product = mongoose.model("Product")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {generateAccessToken, generateRefreshToken} = require('../utils/GenerateToken')

const insertUser = async (username, email, password, role) => {
    try {
      const savedUser = await User.findOne({ email });

      if (savedUser) {
        throw new Error("User already exists with this email");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = new User({ username, email, password: hashedPassword, role });
      
      const newUser = await user.save();
      return {username:newUser.username,email:newUser.email}

    } catch (error) {
      throw new Error(error);
    }
  };
 
 
const validateUser = async(email,password) => {
    try {
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (passwordMatch) {
            const newUser = {email: user.email, role: user.role} 
            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);
          return {id: user._id, username: user.username, email: user.email, accessToken: accessToken, refreshToken: refreshToken}

        } else {     
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        throw new Error(error);
      }

}

const updateAccessToken = async(refreshToken) =>{
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

    if(!decodedRefreshToken) {
        throw new Error("Invalid Refresh Token")
    }

    const user = await User.findOne({ email: decodedRefreshToken.email }); 

    if (!user) {
      throw new Error('User not found');
    }
    const accessToken = generateAccessToken({email:user.email, role:user.role});
    return accessToken
}

const deleteUserService = async(id) => {
  try {
      const user = await User.findById(id);
      if (!user) {
          throw new Error('User not found');
      }
      if (user.role === 'admin') {
          const products = await Product.deleteMany({ soldBy: id });
          return await User.findByIdAndDelete(id);
      } else {
        return await User.findByIdAndDelete(id);
      }
      
    } catch (err) {
      throw new Error(err);
    }

}

module.exports={
    insertUser,
    validateUser,
    updateAccessToken,
    deleteUserService
}