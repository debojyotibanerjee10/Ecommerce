const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config(path="../.env");
mongoose.connect(process.env.Databaseurl).then(()=>{
    console.log("Database connection successfull")
}).catch(()=>{console.log("Some error occured while connecting to the database")})