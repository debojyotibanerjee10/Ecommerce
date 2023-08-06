const mongoose=require("mongoose");
const user=require("./usermodule");
const blueprint=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product description"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product price"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product stock"],
        default:0
    },
    numofreview:{
        type:Number,
        default:0
    },
    review:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            require:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
]
})
const product=new mongoose.model("Product",blueprint);
module.exports=product