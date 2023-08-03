const mongoose=require("mongoose");
const validator=require("validator");
const brcyptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter user name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter user email"],
        unique:true,
        validate:[validator.isEmail,"Incorrect email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter user password"],
        minLength:[8,"Password should be greater than 8 characters"]
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
            type:String,
            default:"user"
        },
        resetpasswordtoken:{
            type:String
        },
        resetpasswordexpire:{
            type:Date
        }
})
userschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await brcyptjs.hash(this.password,8)
    }
    next();
})
userschema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.secretkey,{
        expiresIn:"1d"
    })
}
userschema.methods.comparepassword= async function(enteredpassword){
    return await brcyptjs.compare(enteredpassword,this.password);
}
const user=new mongoose.model("Userinfo",userschema);
module.exports=user