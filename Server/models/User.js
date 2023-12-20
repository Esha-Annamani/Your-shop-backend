const mongoose  = require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength: 6,
        maxLength: 50,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email format",
          },
    },
    password:{
        type:String,
        required:true,
        minLength: 8,
        maxLength: 1024,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    
},{timestamps:true});

mongoose.model("User", userSchema);