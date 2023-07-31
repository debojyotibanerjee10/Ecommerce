const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productcontroller");
const router=express.Router();
router.route("/api/products").get(getAllProducts)
router.route("/api/products").post(createProduct)
router.route("/api/products/:id").put(updateProduct)
router.route("/api/products/:id").delete(deleteProduct)
router.route("/api/products/:id").get(getProductDetails)
module.exports=router