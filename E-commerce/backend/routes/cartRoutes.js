import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; // your JWT middleware

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCartItem); // { productId, quantity }
router.delete("/remove/:productId", protect, removeCartItem);

export default router;
