const express=require("express");
const { registeruser, loginuser, logout,getuserdetails, updatepassword, updateprofile, getalluser, getsingleuser, deleteuser, changeroles } = require("../controller/usercontroller");
const { isauthenticated, authorizeroles } = require("../middleware/auth");
const router=express.Router();
router.route("/userregistration").post(registeruser)
router.route("/loginuser").post(loginuser);
router.route("/logout").get(logout)
router.route("/userdetails").get(isauthenticated,getuserdetails)
router.route("/updatepassword").post(isauthenticated,updatepassword)
router.route("/updateprofile").put(isauthenticated,updateprofile)
router.route("/admin/getusers").get(isauthenticated,authorizeroles("Admin"),getalluser)
router.route("/admin/getsingleuser/:id").get(isauthenticated,authorizeroles("Admin"),getsingleuser)
router.route("/admin/deleteuser/:id").delete(isauthenticated,authorizeroles("Admin"),deleteuser)
router.route("/admin/changerole/:id").put(isauthenticated,authorizeroles("Admin"),changeroles)
module.exports=router