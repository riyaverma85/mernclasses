const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } = require("../controllers/productController");

router.route("/").get(getAllProducts).post(protect,createProduct);
router.route("/:id").get(getProductById).put(protect,updateProduct).delete(protect,deleteProduct);

module.exports = router;
