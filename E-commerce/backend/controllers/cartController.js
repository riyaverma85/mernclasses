import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add product to cart (protected)
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { productId, quantity = 1 } = req.body;

    if (!productId) return res.status(400).json({ message: "productId required" });

    // ensure product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      const idx = cart.items.findIndex(i => i.product.toString() === productId);
      if (idx > -1) {
        // update quantity
        cart.items[idx].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    // populate product details for response
    cart = await Cart.findById(cart._id).populate("items.product");
    res.status(200).json({ message: "Added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user's cart (protected)
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update quantity for a product in cart (protected)
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: "productId required" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      // remove item
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }

    await cart.save();
    const updated = await Cart.findById(cart._id).populate("items.product");
    res.json({ message: "Cart updated", cart: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart (protected)
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    const updated = await Cart.findById(cart._id).populate("items.product");
    res.json({ message: "Item removed", cart: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
