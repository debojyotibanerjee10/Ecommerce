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
exports.getuserdetails=async(req,res,next)=>{
    try{
    const user=await User.findOne(req.user._id);
    if(!user)
    return next(new Errorhandler("User doesnot exist",500))
    res.json({
        success:true,
        user
    })
    }catch(err){
        res.send(err.message)
    }
}
exports.updatepassword=async(req,res,next)=>{
    try{
    const user=await User.findOne(req.user._id);
    if(!user)
    return next(new Errorhandler("User doesnot exist",500));
    const ispassword=await user.comparepassword(req.body.oldpassword);
    if(!ispassword)
    return next(new Errorhandler("Old passowrd is incorrect",400));
    if(req.body.newpassword!==req.body.confirmpassword)
    return  next(new Errorhandler("Password doesnot match",400));
    user.password=req.body.newpassword;
    await user.save();
    res.status(201).json({
        success:true,
        message:"Password changed successfully"
    })
    }catch(err){
        res.send(err.message)
    }
}
exports.updateprofile=async(req,res,next)=>{
    try{
    if(req.body.name){
        req.user.name=req.body.name;
    }
    if(req.body.email){
        req.user.email=req.body.email;
    }
    await req.user.save()
    res.status(201).json({
        success:true,
        message:"Profile updated successfully"
    })}catch(err){
        res.send(err.message);
    }
}
exports.getalluser=async(req,res,next)=>{
    try{
        const users=await User.find();
        res.json({
            success:true,
            users
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.getsingleuser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user)
        return next(new Errorhandler("User not found",500))
    res.status(200).json({
        success:true,
        user
    })
    }catch(err){
        res.send(err.message)
    }
}
exports.deleteuser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user)
        return next(new Errorhandler("User doesnot exist",400));
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success:true,
            message:"User deleted successfully"
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.changeroles=async(req,res,next)=>{
        try{
            const {roles}=req.body
            const user=await User.findById(req.params.id)
            if(!user)
            return next(new Errorhandler("User doesnot exist",400));
            user.role=roles;
            await user.save();
            res.status(201).json({
                success:true,
                message:"User role changed"
            })
        }catch(err){
            res.send(err.message)
        }
}