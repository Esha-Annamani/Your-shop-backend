const mongoose = require("mongoose")
const Account = mongoose.model("Account")


const createAccountService = async (account, user) =>{
    try{
        if(account.user.toString() != user._id.toString()){
            throw new Error("You dont have access to create account ")
        }
        const createdAccount = new Account(account);
        const data = await createdAccount.save(); 
        return data;
    }catch(err){
        throw new Error(err)
    }
}

const updateAccountBalanceService = async (id,account, user) =>{
    try {
        let userAccount= await Account.findById(id);
        if(!userAccount) {
            throw new Error("User Account not found");
        }

        if (user._id.toString() != userAccount.user.toString() || user._id.toString() != account.user.toString()){
            throw new Error("Access Denied. You cannot update balance")
        }
        
        userAccount.balance += account.balance
        const updatedBalance= userAccount.save()
        return updatedBalance; 
    }  catch(err) {
       throw new Error(err);
    }
}
const getAccountBalanceService = async (id, user) => {
    try{
        const account = await Account.findById(id)
        if (user._id.toString() != account.user.toString()){
            throw new Error("Access Denied. You cannot get this account balance")
        }
        return account
    }catch(err){
        throw new Error(err)
    }
}

module.exports = {
    getAccountBalanceService, 
    createAccountService, 
    updateAccountBalanceService
}

