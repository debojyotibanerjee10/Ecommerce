const express=require("express");
const product=require("../model/productmodel")
const router=express();
router.post("/api/products",(req,res)=>{
    const item=new product(req.body);
    item.save().then(()=>{res.send("succesfully saved product to the database")}).catch(()=>{
        res.send("Product details cannot be saved to the databse");
    })
})
router.get("/api/products",async(req,res)=>{
    console.log(req.query)
    try{
    const queryobject={}
    const {name,category,price,rating}=req.query
    if(name)
    queryobject.name={$regex:name,$options:"i"}
    if(category)
    queryobject.category={$regex:category,$options:"i"}
    if(price){
    const minprice=Number(price.gte) || 0
    const maxprice=Number(price.lte) || 1000000
    queryobject.price={
        $gte:minprice,
        $lte:maxprice
    }
}
    if(rating){
    const minrating=Number(rating.gte) || 0
    const maxrating=Number(rating.lte) || 5
    queryobject.rating={
        $gte:minrating,
        $lte:maxrating
    }
}
    let limit=req.query.limit || 10
    let page=req.query.page || 1
    let skip=(page-1)*limit
    const item= await product.find(queryobject).limit(limit).skip(skip);
    res.send(item)}catch(err){res.send("Some error occured")}
})
router.put("/api/products/:id",(req,res)=>{
    product.findById(req.params.id).then((ans)=>{
        if(ans){
            product.findByIdAndUpdate(req.params.id,req.body).then(()=>{
                return res.send("Changed successfully")
            }).catch(()=>{ return res.send("Item details cant be changed")});
        }
        else return res.send("There is no product with the given id");
    }).catch(()=>{return res.send("Some error occured")})
})
router.delete("/api/products/:id",(req,res)=>{
    product.findById(req.params.id).then((ans)=>{
        if(ans){
            product.findByIdAndDelete(req.params.id).then(()=>{
                return res.send("Item deleted successfully");
            }).catch(()=>{
                return res.send("Some error occured while deleting")
            })
        }
        else res.send("There is no product with the given id");
    }).catch(()=>{
        return res.send("Some error occured")
    })
})
module.exports=router;