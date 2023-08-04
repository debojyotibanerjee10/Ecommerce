const Errorhandler = require("../utils/errorhandler");
const User=require("../model/usermodule");
const { sendtoken } = require("../utils/sendtoken");
exports.registeruser=async(req,res,next)=>{
    try{
    const user=new User(req.body);
    await user.save();
    sendtoken(user,201,res);
    }catch(err){
        res.send(err.message)
    }
}
exports.loginuser=async(req,res,next)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new Errorhandler("Please Enter the Required Fileds"),400)
    }
    const user=await User.findOne({email:email});
    if(!user){
        return next(new Errorhandler("Invalid credentials",401));
    }
    const ispassword=await user.comparepassword(password);
    if(!ispassword){
        return next(new Errorhandler("Invalid credentials",401));
    }
    sendtoken(user,200,res);
 }catch(err){
        res.send(err.message);
    }
}
exports.logout=(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout successfuly"
    })
}
exports.forgotpassword=async(req,res,next)=>{
    try{
    const user=await User.find({email:req.body.email});
    if(!user)
    return next(new Errorhandler("Invalid Email",404))
    const passwordtoken=user.getresetpassword();
    await user.save();
    }catch(err){
        res.send(err.message);
    }
}