const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createreview, getproductreview } = require("../controller/productcontroller");
const { isauthenticated, authorizeroles } = require("../middleware/auth");
const router=express.Router();
router.route("/api/products").get(getAllProducts)
router.route("/api/products").post(isauthenticated,authorizeroles("Admin"),createProduct)
router.route("/api/products/:id").put(isauthenticated,authorizeroles("Admin"),updateProduct)
router.route("/api/products/:id").delete(isauthenticated,authorizeroles("Admin"),deleteProduct)
router.route("/api/products/:id").get(getProductDetails)
router.route("/review").put(isauthenticated,createreview)
router.route("/getproductreview/:id").get(getproductreview)
module.exports=router