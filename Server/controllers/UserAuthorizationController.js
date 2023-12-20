const {insertUser, validateUser, deleteUserService, updateAccessToken} = require('../services/UserAuthorizationService')

const userSignup= async(req,res) =>{
    try{
        const {username,email,password,role}=req.body;
        if(!email || !password || !username){
            return res.status(401).json({error:"please enter valid field"})
        }
        const user = await insertUser(
            username,
            email,
            password,
            role
        )
        res.status(201).json({message:"Signed Up Successfully", username: user.username, email: user.email})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const userLogin = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(401).json({error:"please enter valid field"})
        }
        const user = await validateUser(
            email,
            password
        )
        req.session.accessToken = user.accessToken;
        req.session.refreshToken = user.refreshToken;
        res.status(201).json({message:"Logged In Successfully", id: user.id, username: user.username, email: user.email})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const userLogout = (req,res) =>{
    req.session.destroy();
    res.status(200).json({message:"Logged Out Successfully"});
}

const renewAuthToken = async(req,res) =>{
    const refreshToken = req.session.refreshToken; 
    if (!refreshToken) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try{
        const accessToken= await updateAccessToken(refreshToken)
        req.session.accessToken=accessToken
        res.status(200).json({message:"Access token updated successfully"})
    }catch(err){
        res.status(500).json({error:err.message})
    }   
} 

const deleteUserController = async(req,res) =>{
    try{
        const deletedUser = await deleteUserService(req.params.id)
        if (!deletedUser) {
           return res.status(404).json({ error: "User not found" });
        }
        res.status(204).json({message:"User Deleted Successfully"})
     }catch(err){
        res.status(500).json({error:err.message})
     }
}

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    deleteUserController,
    renewAuthToken
}