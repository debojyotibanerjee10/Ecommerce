const product=require("../model/productmodel")
class Apifeatures{
    constructor(querystr){
        this.querystr=querystr;
        this.queryobject={};
    }
    search(){
        const {name}=this.querystr;
        if(name){
            this.queryobject={
                name:{
                $regex:this.querystr.name,
                $options:"i"
                }
            }
        }
        this.query=product.find(this.queryobject)
        return this
    }
    filter(){
    const {category,price,rating}=this.querystr
    if(category)
    this.queryobject={category:{$regex:category,$options:"i"}}
    if(price){
    const minprice=Number(price.gte) || 0
    const maxprice=Number(price.lte) || 1000000
    this.queryobject={price:{
        $gte:minprice,
        $lte:maxprice
    }
    }
}
    if(rating){
    const minrating=Number(rating.gte) || 0
    const maxrating=Number(rating.lte) || 5
    this.queryobject={rating:{
        $gte:minrating,
        $lte:maxrating
    }
}
}
    this.query=product.find(this.queryobject)
    return this
    }

}
module.exports=Apifeatures