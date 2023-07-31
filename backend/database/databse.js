const mongoose=require("mongoose");
mongoose.connect(process.env.Databaseurl).then(()=>{
    console.log("Database connection successfull")
}).catch(()=>{console.log("Some error occured while connecting to the database")})