const express=require("express");
const dotenv=require("dotenv");
require("./database/productdatabse")
const app=express();
app.use(express.json());
app.use(require("./routes/productroute"));
app.listen(80,()=>{console.log("Server running at port 80")});
