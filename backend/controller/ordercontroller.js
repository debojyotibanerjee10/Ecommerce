const order=require("../model/ordermodels");
const product=require("../model/productmodel")
const Errorhandler = require("../utils/errorhandler")
exports.neworder=async(req,res,next)=>{
    try{
        const {shippinginfo,orderitems,paymentinfo,itemsprice,taxprice,shippingprice,totalprice,phoneno}=req.body
        const ordereditems=new order({
            shippinginfo,orderitems,paymentinfo,itemsprice,taxprice,shippingprice,totalprice,phoneno,
            paidat:Date.now(),user:req.user._id
        })
        await ordereditems.save();
        res.status(201).json({
            success:true,
            message:"Ordered received"
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.getsingleorder=async(req,res,next)=>{
    try{
        const orderitem=await order.findById(req.params.id);
        if(!orderitem)
        return next(new Errorhandler("Order doesnot exist",400))
        res.status(200).json({
            success:true,
            orderitem
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.myorder=async(req,res,next)=>{
    try{
        const orderitem=await order.find({user:req.user._id});
        if(!orderitem)
        return next(new Errorhandler("Order doesnot exist",400))
        res.status(200).json({
            success:true,
            orderitem,
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.getallorder=async(req,res,next)=>{
    try{
        const orderitem=await order.find();
        if(!orderitem)
        return next(new Errorhandler("No order",400))
        let Totalprice=0;
        orderitem.forEach((element)=>{
            Totalprice+=element.totalprice
        });
        res.status(200).json({
            success:true,
            orderitem,
            Totalprice
        })
    }catch(err){
        res.send(err.message)
    }
}
exports.updateitem=async(req,res,next)=>{
    try{
        const orderitem=await order.findById(req.params.id);
        if(orderitem.orderstatus==="Delivered")
        return next(new Errorhandler("Item Already Delivered",400));
        orderitem.orderitems.forEach(async(element)=>{
            await updatestocks(element.product,element.quantity)});
            orderitem.orderstatus=req.body.status;
            if(req.body.status==="Delivered")
            orderitem.deliveredat=Date.now();
        await orderitem.save();
        res.status(201).json({
            success:true,
            message:"Updated item successfully"
        })
    }catch(err){
        res.send(err.message)
    }
}
async function updatestocks(id,quantity){
    const item=await product.findById(id);
    if(!item){
        return next(new Errorhandler("Product doesnot found",400));
    }
        item.stock=item.stock-quantity;
        await item.save();
    }
exports.deleteorder=async(req,res,next)=>{
    try{
    await order.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success:true,
        message:"Order deleted successfully"
    })
}catch(err){res.send(err.message)}
}