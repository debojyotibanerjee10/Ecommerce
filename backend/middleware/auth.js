const Errorhandler = require("../utils/errorhandler");
const jwt=require("jsonwebtoken")
const User=require("../model/usermodule")
exports.isauthenticated=async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhandler("Plzz login in again",401))
    }
    const decodeddata=jwt.verify(token,process.env.secretkey);
    req.user=await User.findById(decodeddata.id)
    next();
}catch(err){
    return next(new Errorhandler("Some error occured",400))
}
} 