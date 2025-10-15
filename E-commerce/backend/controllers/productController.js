import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image required" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "organic_products" });

    const product = await Product.create({
      name,
      price,
      description,
      image: result.secure_url
    });

    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
