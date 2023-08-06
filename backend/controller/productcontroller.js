const product=require("../model/productmodel")
const Apifeatures = require("../utils/apifeatures")
const Errorhandler = require("../utils/errorhandler")
exports.getAllProducts=async(req,res,next)=>{
    try{
    const api=new Apifeatures(req.query).search().filter()
    const item=await api.query
    res.status(200).json({success:true,item})
    }catch(err){res.send(err.message)}
}
exports.createProduct=async(req,res,next)=>{
    try{
    const item=new product(req.body)
    await item.save()
    res.status(201).json({
        success:true,
        item
    })}catch(err){
        res.status(500).send(err.message)
    }
}
exports.updateProduct=async(req,res,next)=>{
    try{
    const item=await product.findById(req.params.id);
    if(!item)
    {
        return next(new Errorhandler("Product Not found",500))
    }
    await product.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({
        success:true,
        item
    })}catch(err){
        res.status(500).send(err.message)
    }
}
exports.getProductDetails=async(req,res,next)=>{
    try{
    const item=await product.findById(req.params.id);
    if(!item)
    {
        return next(new Errorhandler("Product Not found",404))
    }
   res.status(200).json({
    success:true,
    item
   })}catch(err){
    res.status(500).send(err.message)
   }
}
exports.deleteProduct=async(req,res,next)=>{
    try{
    const item=await product.findById(req.params.id);
    if(!item)
    {
        return next(new Errorhandler("Product Not found",500))
    }
    await product.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success:true,
        message:"Item deleted"
    })}catch(err){
        res.status(500).send(err.message)
    }
} 
exports.createreview=async(req,res,next)=>{
    const {rating,comment,productid}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const item=await product.findById(productid);
    try{
    const isreviewed=item.review.find((rev)=>rev.user.toString()===req.user._id.toString())
    if(isreviewed){
        item.review.forEach((element)=>{
            if(element.user.toString()===req.user._id.toString())
            {
                element.rating=rating;
                element.comment=comment;
            }
        })
    }else{
        item.review.push(review);
        item.numofreview=item.review.length;
    }
    let sum=0;
    let avg=item.review.forEach((element)=>{
        sum=sum+element.rating
    });
    item.rating=sum/item.review.length;
    await item.save();
    res.status(201).json({success:true,message:"Feedback saved"})
}catch(err){
    res.send(err.message);
}
}
exports.getproductreview=async(req,res,next)=>{
    try{
    const item=await product.findById(req.params.id);
    if(!item){
        return next(new Errorhandler("Product not found",400));
    }
    res.status(200).json({
        success:true,
        Review:item.review
    })}catch(err){res.send(err.message)};
}