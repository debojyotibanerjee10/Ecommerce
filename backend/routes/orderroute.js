const express=require("express");
const { neworder, getsingleorder, myorder, getallorder, updateitem, deleteorder } = require("../controller/ordercontroller");
const { isauthenticated, authorizeroles } = require("../middleware/auth");
const router=express.Router();
router.route("/order/new").post(isauthenticated,neworder);
router.route("/order/:id").get(isauthenticated,getsingleorder);
router.route("/myorder").get(isauthenticated,myorder);
router.route("/allorders").get(isauthenticated,authorizeroles("Admin"),getallorder);
router.route("/order/:id").put(isauthenticated,authorizeroles("Admin"),updateitem);
router.route("/order/delete/:id").delete(isauthenticated,authorizeroles("Admin"),deleteorder);
module.exports=router