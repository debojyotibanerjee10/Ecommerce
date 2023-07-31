const express=require("express");
const app=express();
const errormiddleware=require("./middleware/error")
const dotenv=require("dotenv")
dotenv.config(path="../.env");
app.use(express.json());
require("./database/databse")
app.use(require("./routes/productroute"));
app.use(errormiddleware)
app.listen(80,()=>{console.log("Server running at port 80")});
