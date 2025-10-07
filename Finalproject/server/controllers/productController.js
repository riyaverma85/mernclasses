const Product = require("../models/Product");

const createProduct = async (req,res)=>{
  const {name,description,price,stock,category,images} = req.body;
  const product = await Product.create({
    sellerId: req.user._id,
    name,description,price,stock,category,images
  });
  res.status(201).json(product);
};

const getAllProducts = async (req,res)=>{
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req,res)=>{
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else res.status(404).json({message:"Product not found"});
};

const updateProduct = async (req,res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    if(product.sellerId.toString() !== req.user._id.toString()){
      return res.status(401).json({message:"Not authorized"});
    }
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  }else{
    res.status(404).json({message:"Product not found"});
  }
};

const deleteProduct = async (req,res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    if(product.sellerId.toString() !== req.user._id.toString()){
      return res.status(401).json({message:"Not authorized"});
    }
    await product.remove();
    res.json({message:"Product removed"});
  }else{
    res.status(404).json({message:"Product not found"});
  }
};

module.exports = { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct };
