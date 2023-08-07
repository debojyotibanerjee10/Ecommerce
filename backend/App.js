const express=require("express");
const app=express();
const cookieparser=require("cookie-parser")
const errormiddleware=require("./middleware/error")
const dotenv=require("dotenv")
dotenv.config(path="../.env");
app.use(express.json());
app.use(cookieparser())
require("./database/databse")
app.use(require("./routes/productroute"));
app.use(require("./routes/userroute"))
app.use(require("./routes/orderroute"))
app.use(errormiddleware)
app.listen(80,()=>{console.log("Server running at port 80")});
