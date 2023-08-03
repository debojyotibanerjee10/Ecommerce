const express=require("express");
const { registeruser, loginuser, logout } = require("../controller/usercontroller");
const router=express.Router();

router.route("/userregistration").post(registeruser)
router.route("/loginuser").post(loginuser);
router.route("/logout").get(logout)
module.exports=router