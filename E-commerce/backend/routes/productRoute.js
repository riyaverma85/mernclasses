import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // admin middleware for admin-only routes
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder for multer

router.post("/add", protect, admin, upload.single("image"), addProduct);
router.get("/", getProducts);

export default router;
