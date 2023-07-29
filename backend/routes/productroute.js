const express=require("express");
const product=require("../model/productmodel")
const router=express();
router.post("/api/products",(req,res)=>{
    const item=new product(req.body);
    item.save().then(()=>{res.send("succesfully saved product to the database")}).catch(()=>{
        res.send("Product details cannot be saved to the databse");
    })
})
router.get("/api/products",(req,res)=>{
    product.find().then((all)=>{res.send(all)}).catch(()=>{res.send("some error occured")})
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