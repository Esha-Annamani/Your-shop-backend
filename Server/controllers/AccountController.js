const {getAccountBalanceService, createAccountService, updateAccountBalanceService} = require('../services/AccountServices');


const getAccountBalanceController = async(req,res) =>{
    try{
       const account = await getAccountBalanceService(req.params.id,req.session.user)
       if (!account) {
          return res.status(404).json({ error: "Account not found" });
       }
       res.status(200).json(account)
    }catch(err){
       res.status(500).json({error:err.message})
    }
 }

const createAccountController = async(req,res) =>{
   try{
      const createdAccount = await createAccountService(req.body,req.session.user)
      res.status(201).json({account:createdAccount,message:"Address Added Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}
const updateAccountBalanceController = async(req,res) =>{
   try{
      const updatedAccount = await updateAccountBalanceService(req.params.id, req.body, req.session.user)
      if (!updatedAccount) {
         return res.status(404).json({ error: "Account not found" });
      }
      res.status(201).json({message:"Amount deposited Successfully"})
   }catch(err){
      res.status(500).json({error:err.message})
   }
   
}



module.exports = {
    getAccountBalanceController, 
    createAccountController, 
    updateAccountBalanceController
}